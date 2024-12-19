import React from 'react';
import { View, StyleSheet} from 'react-native';
import {  Switch, Text, TextInput } from 'react-native-paper';
import { Question } from '../../../types';

interface TextQuestionProps {
  question: Question;
  onUpdate: (id: string, updates: Partial<Question>) => void;
}

export const TextQuestion = ({ question, onUpdate }: TextQuestionProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        label="Question"
        value={question.title}
        onChangeText={(text) => onUpdate(question.id, { title: text })}
        style={styles.input}
      />
      <View style={styles.row}>
        <Text>Required</Text>
        <Switch
          value={question.required}
          onValueChange={(value) =>
            onUpdate(question.id, { required: value })
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});