import { useState } from 'react';
import { RegisterAuthUseCase } from '../../../Domain/useCases/auth/RegisterAuth';

export const RegisterViewModel = () => {
	const [errorMessage, setErrorMessage] = useState('');
	const [values, setValues] = useState({
		name: '',
		lastName: '',
		phone: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	const onChange = (property: string, value: any) => {
		setValues({ ...values, [property]: value });
	};

	const register = async () => {
		if (isValidForm()) {
			const response = await RegisterAuthUseCase(values);
			console.log('result:', JSON.stringify(response));
		}
	};

	const isValidForm = (): boolean => {
		if (values.name === '') {
			setErrorMessage('Ingresa tu nombre');
			return false;
		}
		if (values.lastName === '') {
			setErrorMessage('Ingresa tu apellido');
			return false;
		}
		if (values.phone === '') {
			setErrorMessage('Ingresa tu teléfono');
			return false;
		}
		if (values.email === '') {
			setErrorMessage('Ingresa tu email');
			return false;
		}
		if (values.password === '') {
			setErrorMessage('Ingresa tu password');
			return false;
		}
		if (values.confirmPassword === '') {
			setErrorMessage('Ingresa tu confirmación');
			return false;
		}
		if (values.password !== values.confirmPassword) {
			setErrorMessage('Las constraseñas no coinciden');
			return false;
		}
		return true;
	};

	return {
		...values,
		onChange,
		register,
		errorMessage,
	};
};

export default RegisterViewModel;
