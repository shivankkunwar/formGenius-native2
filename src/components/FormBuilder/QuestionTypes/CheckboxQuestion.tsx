import React from 'react';
import { View, StyleSheet } from 'react-native';
import {  Switch, Text, Button, TextInput } from 'react-native-paper';
import { Question } from '../../../types';

interface CheckboxQuestionProps {
  question: Question;
  onUpdate: (id: string, updates: Partial<Question>) => void;
}

export const CheckboxQuestion = ({ question, onUpdate }: CheckboxQuestionProps) => {
  const addOption = () => {
    const options = [...(question.options || []), ''];
    onUpdate(question.id, { options });
  };

  const updateOption = (index: number, value: string) => {
    const options = [...(question.options || [])];
    options[index] = value;
    onUpdate(question.id, { options });
  };

  const removeOption = (index: number) => {
    const options = (question.options || []).filter((_, i) => i !== index);
    onUpdate(question.id, { options });
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Question"
        value={question.title}
        onChangeText={(text) => onUpdate(question.id, { title: text })}
        style={styles.input}
      />
      {question.options?.map((option, index) => (
        <View key={index} style={styles.optionRow}>
          <TextInput
            label={`Option ${index + 1}`}
            value={option}
            onChangeText={(text) => updateOption(index, text)}
            style={styles.optionInput}
          />
          <Button
            icon="close"
            onPress={() => removeOption(index)}
            mode="text"
          />
        </View>
      ))}
      <Button
        mode="outlined"
        onPress={addOption}
        style={styles.addButton}
      >
        Add Option
      </Button>
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
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionInput: {
    flex: 1,
    marginRight: 8,
  },
  addButton: {
    marginVertical: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
});