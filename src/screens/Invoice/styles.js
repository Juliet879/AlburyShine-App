import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		padding: 20,
		// minHeight: Math.round(Dimensions.get('window').height),
	},
    button: {
		backgroundColor: '#276EF1',
		textDecorationStyle: 'capitalized',
		marginVertical: 20,
		paddingVertical: 5,
		borderRadius:5
	},
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    }


});

export default styles;
