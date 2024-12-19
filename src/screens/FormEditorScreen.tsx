import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, StyleSheet, Share } from 'react-native';
import { Button } from 'react-native-paper';
import { FormHeader } from '../components/FormBuilder/FormHeader';
import { TextQuestion } from '../components/FormBuilder/QuestionTypes/TextQuestion';
import { CheckboxQuestion } from '../components/FormBuilder/QuestionTypes/CheckboxQuestion';
import { GridQuestion } from '../components/FormBuilder/QuestionTypes/GridQuestion';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { formApi } from '../services/api';
import { Form, Question } from '../types';

export default function FormEditorScreen({ route, navigation }: any) {
  const formId = route.params?.formId;
  const [form, setForm] = useState<Form>({
    title: '',
    description: '',
    questions: [],
    createdBy: '',
  });
  const [loading, setLoading] = useState(!!formId);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const loadForm = useCallback(async () => {
    try {
      const loadedForm = await formApi.getFormById(formId);
      setForm(loadedForm);
    } catch (err : any) {
      setError(err.response?.data?.error || 'Failed to load form');
    } finally {
      setLoading(false);
    }
  }, [formId]);
  
  useEffect(() => {
    if (formId) {
      loadForm();
    }
  }, [formId, loadForm]);

 

  const addQuestion = (type: Question['type']) => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      type,
      title: '',
      required: false,
      options: type === 'checkbox' ? [''] : undefined,
      rows: type === 'grid' ? [''] : undefined,
      columns: type === 'grid' ? [''] : undefined,
    };
    setForm({
      ...form,
      questions: [...form.questions, newQuestion],
    });
  };

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setForm({
      ...form,
      questions: form.questions.map((q) =>
        q.id === id ? { ...q, ...updates } : q
      ),
    });
  };

  // const removeQuestion = (id: string) => {
  //   setForm({
  //     ...form,
  //     questions: form.questions.filter((q) => q.id !== id),
  //   });
  // };

  const handleShare = async () => {
    try {
      const formData = await formApi.getFormById(formId);
      const shareableLink = `your-app-scheme://form/${formData.shareableLink}`;
      
      await Share.share({
        message: `Please fill out my form: ${shareableLink}`,
        title: formData.title,
      });
    } catch (error) {
      console.error('Error sharing form:', error);
    }
  };

  const viewResponses = () => {
    navigation.navigate('Responses', { formId });
  };
  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');
      
      if (formId) {
        await formApi.updateForm(formId, form);
      } else {
        await formApi.createForm(form);
      }
      
      navigation.goBack();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to save form');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <FormHeader
          title={form.title}
          description={form.description || ''}
          headerImage={form.headerImage}
          onTitleChange={(title) => setForm({ ...form, title })}
          onDescriptionChange={(description) => setForm({ ...form, description })}
          onImageChange={(headerImage) => setForm({ ...form, headerImage })}
        />

        {form.questions.map((question) => {
          switch (question.type) {
            case 'text':
              return (
                <TextQuestion
                  key={question.id}
                  question={question}
                  onUpdate={updateQuestion}
                />
              );
            case 'checkbox':
              return (
                <CheckboxQuestion
                  key={question.id}
                  question={question}
                  onUpdate={updateQuestion}
                />
              );
            case 'grid':
              return (
                <GridQuestion
                  key={question.id}
                  question={question}
                  onUpdate={updateQuestion}
                />
              );
            default:
              return null;
          }
        })}

        {error && <ErrorMessage message={error} />}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.questionTypes}>
          <Button
            mode="outlined"
            onPress={() => addQuestion('text')}
            style={styles.button}
          >
            Text
          </Button>
          <Button
            mode="outlined"
            onPress={() => addQuestion('checkbox')}
            style={styles.button}
          >
            MCQ
          </Button>
          <Button
            mode="outlined"
            onPress={() => addQuestion('grid')}
            style={styles.button}
          >
           Grid
          </Button>
        </View>
        <Button
          mode="contained"
          onPress={handleSave}
          loading={saving}
          disabled={saving || !form.title}
          style={styles.saveButton}
        >
          Save Form
        </Button>
      </View>
      {formId && (
        <View style={styles.actionButtons}>
          {/* <Button
            mode="contained"
            onPress={handleShare}
            icon="share"
            style={styles.actionButton}
          >
            Share Form
          </Button> */}
          <Button
            mode="contained"
            onPress={viewResponses}
            icon="format-list-bulleted"
            style={styles.actionButton}
          >
            View Responses
          </Button>
        </View>
      )}
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
  footer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  questionTypes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
  saveButton: {
    marginTop: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 8,
  },
});