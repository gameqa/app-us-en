import React from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { Atoms, Molecules } from "../../components";
import { StoreState } from "../../reducers";
import LayoutWrapper from "../../layout";
import * as Actions from "../../actions";
import { useNavigation } from "@react-navigation/native";

const Settings = () => {
    
	const auth = useSelector((state: StoreState) => state.auth);
	const dispatch = useDispatch();
	const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    }

    const handleLogOut = () => {
		Alert.alert("Sign Out", "Are you sure that you want to leave? 😢", [
			{
				text: "No ",
				onPress: () => null,
				style: "cancel",
			},
			{ text: "Yes", onPress: () => dispatch(Actions.Auth.logOutUser()) },
		]);
    }

    const handleDeleteAccount = () => {
		Alert.alert("Delete Account", "Are you sure you want to delete your account? You will need to start from scratch", [
			{
				text: "No ",
				onPress: () => null,
				style: "cancel",
			},
			{ text: "Yes", onPress: () => dispatch(Actions.Auth.deleteUser()) },
		]);
    }

	return (
		<LayoutWrapper>
			<View style={styles.outer}>
				<Molecules.Users.Info {...auth} />
				<View style={styles.inner}>
					<View>
						<TouchableOpacity style={styles.item} onPress={handleLogOut}>
							<Atoms.Text.Para style={styles.itemText}>
								Log Out
							</Atoms.Text.Para>
						</TouchableOpacity>
						<TouchableOpacity style={styles.item} onPress={handleDeleteAccount}>
							<Atoms.Text.Para style={styles.dangerItemText}>
								Delete Account
							</Atoms.Text.Para>
						</TouchableOpacity>
					</View>
					<TouchableOpacity style={styles.item} onPress={handleGoBack}>
						<Atoms.Text.Para>Go Back</Atoms.Text.Para>
					</TouchableOpacity>
				</View>
			</View>
		</LayoutWrapper>
	);
};

export default Settings;
