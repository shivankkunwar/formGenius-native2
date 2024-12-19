import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Text, TextInput, Checkbox, RadioButton, Button, Card } from 'react-native-paper';
import { formApi } from '../services/api';
import { Form, Question } from '../types';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorMessage } from '../components/common/ErrorMessage';

export default function PreviewScreen({ route, navigation }: any) {
  const { formId } = route.params;
  const [form, setForm] = useState<Form | null>(null);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const loadForm = useCallback(async () => {
    try {
      const loadedForm = await formApi.getFormById(formId);
      setForm(loadedForm);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load form');
    } finally {
      setLoading(false);
    }
  },[formId]);

  useEffect(() => {
    loadForm();
  }, [formId,loadForm]);

  const handleSubmit = async () => {
    if (!form) return;

    try {
      setSubmitting(true);
      setError('');

      const responseData = {
        formId: form._id,
        answers: form.questions.map(question => ({
          questionId: question.id,
          questionTitle: question.title,
          answer: answers[question.id] || '',
          questionType: question.type
        }))
      };

      await formApi.submitResponse(responseData);
      navigation.goBack();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to submit response');
    } finally {
      setSubmitting(false);
    }
  };

  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case 'text':
        return (
          <Card style={styles.questionCard}>
            <Card.Content>
              <Text style={styles.questionTitle}>
                {question.title}
                {question.required && <Text style={styles.required}> *</Text>}
              </Text>
              <TextInput
                value={answers[question.id] || ''}
                onChangeText={(text) => setAnswers({ ...answers, [question.id]: text })}
                mode="outlined"
                style={styles.textInput}
              />
            </Card.Content>
          </Card>
        );

      case 'checkbox':
        return (
          <Card style={styles.questionCard}>
            <Card.Content>
              <Text style={styles.questionTitle}>
                {question.title}
                {question.required && <Text style={styles.required}> *</Text>}
              </Text>
              <View style={styles.checkboxContainer}>
                {question.options?.map((option, index) => (
                  <View key={index} style={styles.checkboxItem}>
                    <Checkbox.Android
                      status={
                        (answers[question.id] || []).includes(option)
                          ? 'checked'
                          : 'unchecked'
                      }
                      onPress={() => {
                        const currentAnswers = answers[question.id] || [];
                        const newAnswers = currentAnswers.includes(option)
                          ? currentAnswers.filter((a: string) => a !== option)
                          : [...currentAnswers, option];
                        setAnswers({ ...answers, [question.id]: newAnswers });
                      }}
                    />
                    <Text style={styles.checkboxLabel}>{option}</Text>
                  </View>
                ))}
              </View>
            </Card.Content>
          </Card>
        );

      case 'grid':
        return (
          <Card style={styles.questionCard}>
            <Card.Content>
              <Text style={styles.questionTitle}>
                {question.title}
                {question.required && <Text style={styles.required}> *</Text>}
              </Text>
              <ScrollView horizontal={true} style={styles.gridContainer}>
                <View>
                  <View style={styles.gridHeader}>
                    <View style={styles.gridCell}>
                      <Text children={undefined}></Text>
                    </View>
                    {question.columns?.map((column, colIndex) => (
                      <View key={colIndex} style={styles.gridCell}>
                        <Text style={styles.gridHeaderText}>{column}</Text>
                      </View>
                    ))}
                  </View>
                  {question.rows?.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.gridRow}>
                      <View style={styles.gridCell}>
                        <Text style={styles.gridRowText}>{row}</Text>
                      </View>
                      {question.columns?.map((column, colIndex) => (
                        <View key={colIndex} style={styles.gridCell}>
                          <RadioButton
                            value={column}
                            status={
                              answers[`${question.id}_${row}`] === column
                                ? 'checked'
                                : 'unchecked'
                            }
                            onPress={() =>
                              setAnswers({
                                ...answers,
                                [`${question.id}_${row}`]: column,
                              })
                            }
                          />
                        </View>
                      ))}
                    </View>
                  ))}
                </View>
              </ScrollView>
            </Card.Content>
          </Card>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!form) {
    return <ErrorMessage message="Form not found" />;
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {form?.headerImage&&<Image source={{uri: form.headerImage}} style={styles.headerImage} />}
        <Card style={styles.headerCard}>
          <Card.Content>
            <Text style={styles.title}>{form.title}</Text>
            {form.description && (
              <Text style={styles.description}>{form.description}</Text>
            )}
          </Card.Content>
        </Card>

        {form.questions.map((question) => (
          <View key={question.id} style={styles.questionWrapper}>
            {renderQuestion(question)}
          </View>
        ))}

        {error && <ErrorMessage message={error} />}
      </ScrollView>

      <View style={styles.footer}>
        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={submitting}
          disabled={submitting}
          style={styles.submitButton}
        >
          Submit
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  headerCard: {
    margin: 16,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
  },
  questionWrapper: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  questionCard: {
    elevation: 2,
  },
  questionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
  },
  required: {
    color: '#B00020',
  },
  textInput: {
    backgroundColor: '#fff',
  },
  checkboxContainer: {
    marginTop: 8,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  checkboxLabel: {
    marginLeft: 8,
    flex: 1,
  },
  gridContainer: {
    marginTop: 8,
  },
  gridHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  gridCell: {
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  gridHeaderText: {
    fontWeight: '500',
    textAlign: 'center',
  },
  gridRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  gridRowText: {
    textAlign: 'left',
  },
  footer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  submitButton: {
    marginTop: 8,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
});