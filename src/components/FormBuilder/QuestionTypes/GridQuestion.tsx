import React from 'react';
import { View, StyleSheet } from 'react-native';
import {  Switch, Text, Button, TextInput } from 'react-native-paper';
import { Question } from '../../../types';

interface GridQuestionProps {
  question: Question;
  onUpdate: (id: string, updates: Partial<Question>) => void;
}

export const GridQuestion = ({ question, onUpdate }: GridQuestionProps) => {
  const addRow = () => {
    const rows = [...(question.rows || []), ''];
    onUpdate(question.id, { rows });
  };

  const addColumn = () => {
    const columns = [...(question.columns || []), ''];
    onUpdate(question.id, { columns });
  };

  const updateRow = (index: number, value: string) => {
    const rows = [...(question.rows || [])];
    rows[index] = value;
    onUpdate(question.id, { rows });
  };

  const updateColumn = (index: number, value: string) => {
    const columns = [...(question.columns || [])];
    columns[index] = value;
    onUpdate(question.id, { columns });
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Question"
        value={question.title}
        onChangeText={(text) => onUpdate(question.id, { title: text })}
        style={styles.input}
      />
      
      <Text style={styles.sectionTitle}>Rows</Text>
      {question.rows?.map((row, index) => (
        <View key={`row-${index}`} style={styles.optionRow}>
          <TextInput
            label={`Row ${index + 1}`}
            value={row}
            onChangeText={(text) => updateRow(index, text)}
            style={styles.optionInput}
          />
          <Button
            icon="close"
            onPress={() => {
              const rows = question.rows?.filter((_, i) => i !== index);
              onUpdate(question.id, { rows });
            }}
            mode="text"
            children={null}
          />
        </View>
      ))}
      <Button
        mode="outlined"
        onPress={addRow}
        style={styles.addButton}
      >
        Add Row
      </Button>

      <Text style={styles.sectionTitle}>Columns</Text>
      {question.columns?.map((column, index) => (
        <View key={`column-${index}`} style={styles.optionRow}>
          <TextInput
            label={`Column ${index + 1}`}
            value={column}
            onChangeText={(text) => updateColumn(index, text)}
            style={styles.optionInput}
          />
          <Button
            icon="close"
            onPress={() => {
              const columns = question.columns?.filter((_, i) => i !== index);
              onUpdate(question.id, { columns });
            }}
            mode="text"
          />
        </View>
      ))}
      <Button
        mode="outlined"
        onPress={addColumn}
        style={styles.addButton}
      >
        Add Column
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
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