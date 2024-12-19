import React, {useCallback, useEffect, useState} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Card, Title, Text, Divider} from 'react-native-paper';
import {formApi} from '../services/api';
import {LoadingSpinner} from '../components/common/LoadingSpinner';
import {ErrorMessage} from '../components/common/ErrorMessage';

export default function ResponsesScreen({route}: any) {
  const {formId} = route.params;
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const loadResponses = useCallback(async () => {
    try {
      const data = await formApi.getFormResponses(formId);
      setResponses(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [formId]);
  useEffect(() => {
    loadResponses();
  }, [loadResponses]);

  const formatAnswer = (answer: any, type: string) => {
    if (type === 'checkbox') {
      return Array.isArray(answer) ? answer.join(', ') : answer;
    }
    return answer?.toString() || 'No answer';
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <ScrollView style={styles.container}>
      <Title style={styles.pageTitle}>Form Responses</Title>
      {responses.length === 0 ? (
        <Card style={styles.card}>
          <Card.Content>
            <Text>No responses yet</Text>
          </Card.Content>
        </Card>
      ) : (
        responses.map((response: any, index) => (
          <Card key={index} style={styles.card}>
            <Card.Content>
              <Text style={styles.timestamp}>
                Submitted: {new Date(response.submittedAt).toLocaleString()}
              </Text>
              <Divider style={styles.divider} />
              {response.answers.map((answer: any, answerIndex: number) => (
                <View key={answerIndex} style={styles.answerContainer}>
                  <Text style={styles.questionTitle}>
                    {answer.questionTitle || `Question ${answerIndex + 1}`}
                  </Text>
                  <Text style={styles.answer}>
                    {formatAnswer(answer.answer, answer.questionType)}
                  </Text>
                </View>
              ))}
            </Card.Content>
          </Card>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  pageTitle: {
    fontSize: 24,
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  timestamp: {
    color: '#666',
    fontSize: 12,
    marginBottom: 8,
  },
  divider: {
    marginVertical: 8,
  },
  answerContainer: {
    marginVertical: 8,
  },
  questionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  answer: {
    fontSize: 14,
    color: '#333',
  },
});
