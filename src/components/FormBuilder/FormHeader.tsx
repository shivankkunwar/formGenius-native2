import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {TextInput} from 'react-native-paper';
import * as ImagePicker from 'react-native-image-picker';

interface FormHeaderProps {
  title: string;
  description: string;
  headerImage?: string;
  onTitleChange: (text: string) => void;
  onDescriptionChange: (text: string) => void;
  onImageChange: (uri: string) => void;
}

export const FormHeader = ({
  title,
  description,
  headerImage,
  onTitleChange,
  onDescriptionChange,
  onImageChange,
}: FormHeaderProps) => {
  const selectImage = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
      },
      response => {
        if (response.assets && response.assets[0].uri) {
          onImageChange(response.assets[0].uri);
        }
      },
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={selectImage} style={styles.imageContainer}>
        {headerImage ? (
          <Image source={{uri: headerImage}} style={styles.headerImage} />
        ) : (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>Add Header Image</Text>
          </View>
        )}
      </TouchableOpacity>

      <TextInput
        label="Form Title"
        value={title}
        onChangeText={onTitleChange}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Description (Optional)"
        value={description}
        onChangeText={onDescriptionChange}
        mode="outlined"
        multiline
        numberOfLines={3}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  imageContainer: {
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    marginTop: 8,
    color: '#666',
  },
  input: {
    marginBottom: 16,
  },
});
