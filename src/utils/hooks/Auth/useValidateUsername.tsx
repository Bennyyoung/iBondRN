import { useState } from 'react';
import { useValidateUsernameMutation } from '@/redux/features/auth/service';

const useValidateUsername = () => {
  const [validateUsername] = useValidateUsernameMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isUsernameValid, setIsUsernameValid] = useState(false);

  const validate = async (username: string) => {
    setIsLoading(true);
    setError(null);
    setIsUsernameValid(false);

    try {
      const response = await validateUsername(username).unwrap();

      if (response.data.itExist) {
        setSuggestions(response.data.suggestions);
        setIsUsernameValid(false);
        setError('Username is already taken. Please choose a suggestion.');
      } else {
        setSuggestions([]);
        setIsUsernameValid(true);
        setError(null);
      }
    } catch (err) {
      setError('Error occurred during username validation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    validate,
    isLoading,
    error,
    suggestions,
    isUsernameValid,
    setIsUsernameValid,
  };
};

export default useValidateUsername;
