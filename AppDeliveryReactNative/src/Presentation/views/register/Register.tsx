import React, { useEffect } from 'react';
import { View, Image, Text, ScrollView, ToastAndroid } from 'react-native';
import { RoundedButton } from '../../components/RoundedButton';
import useViewmodel from './ViewModel';
import styles from './Styles';
import { CustomTextInput } from '../../components/CustomTextInput';

export const RegisterScreen = () => {
	const { name, lastName, phone, email, password, confirmPassword, errorMessage, onChange, register } = useViewmodel();
	useEffect(() => {
		if (errorMessage != '') {
			ToastAndroid.show(errorMessage, ToastAndroid.LONG);
		}
	}, [errorMessage]);

	return (
		<View style={styles.container}>
			<Image
				source={require('../../../../assets/chef.jpg')}
				style={styles.imageBackground}
			/>

			<View style={styles.logoContainer}>
				<Image
					source={require('../../../../assets/user_image.png')}
					style={styles.logoImage}
				/>
				<Text style={styles.logoText}>SELECCIONE UNA IMAGEN</Text>
			</View>
			<View style={styles.form}>
				<ScrollView>
					<Text style={styles.formText}>REGISTRARSE</Text>
					<CustomTextInput
						image={require('../../../../assets/user.png')}
						property='name'
						placeholder='Nombre'
						keyboardType='default'
						onChangeText={onChange}
						value={name}
					/>
					<CustomTextInput
						image={require('../../../../assets/my_user.png')}
						property='lastName'
						placeholder='Apellido'
						keyboardType='default'
						onChangeText={onChange}
						value={lastName}
					/>
					<CustomTextInput
						image={require('../../../../assets/email.png')}
						property='email'
						placeholder='Correo Electrónico'
						keyboardType='email-address'
						onChangeText={onChange}
						value={email}
					/>
					<CustomTextInput
						image={require('../../../../assets/phone.png')}
						property='phone'
						placeholder='Teléfono'
						keyboardType='numeric'
						onChangeText={onChange}
						value={phone}
					/>
					<CustomTextInput
						image={require('../../../../assets/password.png')}
						property='password'
						placeholder='Contraseña'
						keyboardType='default'
						secureTextEntry={true}
						onChangeText={onChange}
						value={password}
					/>
					<CustomTextInput
						image={require('../../../../assets/confirm_password.png')}
						property='confirmPassword'
						placeholder='Confirmar Contraseña'
						keyboardType='default'
						secureTextEntry={true}
						onChangeText={onChange}
						value={confirmPassword}
					/>
					<View style={{ marginTop: 20 }}>
						<RoundedButton
							text='CONFIRMAR'
							onPress={() => {
								register();
							}}
						/>
					</View>
				</ScrollView>
			</View>
		</View>
	);
};
