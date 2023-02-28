import { StyleSheet } from 'react-native';

const splashScreenStyles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#276EF1',
	},
	image: {
		height: 100,
		width: 150,
		alignSelf: 'center',
		marginBottom: 32,
	},
	outerText: {
		color: '#FFFFFF',
		alignSelf: 'center',
		letterSpacing: 3,
		paddingTop: 150,
	},
	animated: {
		position: 'absolute',
		// top: 100,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default splashScreenStyles;
