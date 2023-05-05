import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, useColorScheme , Text} from "react-native";
import { Button, TextInput, DefaultTheme, Menu } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import { API_URL } from "@env";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-root-toast";
import styles from "./styles";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3498db",
    accent: "#f1c40f",
  },
};

const validationSchema = Yup.object().shape({
  userId: Yup.string().required("Required"),
  accountNumber: Yup.string().required("Required"),
  bank: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  abn: Yup.string().required("Required"),
  bsb: Yup.string().required("Required"),
});

const CreateInvoice = ({ navigation }) => {
  const [token, setToken] = useState();
  const [loading, setIsLoading] = useState();
  const [employees, setEmployees] = useState([]);

  const colorScheme = useColorScheme();
  const themeTextStyle =
    colorScheme === "light" ? styles.lightTextColor : styles.darkTextColor;
  const buttonTextStyle =
    colorScheme === "light" ? styles.lightButtonColor : styles.darkButtonColor;
  const labelTextStyle = colorScheme === "light" ? "#252524" : "#252524";

  const getEmployees = () => {
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    fetch(`${API_URL}/employers/all-employees`, {
      headers,
    })
      .then((response) => {
        if (response.status === 403) {
          Toast.show(`Your session has expired, kindly login and try again`, {
            duration: Toast.durations.LONG,
          });
          SecureStore.deleteItemAsync("token")
            .then(() => navigation.replace("Login Screen"))
            .catch((error) =>
              Toast.show(error.message, {
                duration: Toast.durations.LONG,
              })
            );
        }
        return response.json();
      })
      .then(async (response) => {
        console.log({ response });
        if (response.success === false) {
          console.log({ response });
          Toast.show(response.error, {
            duration: Toast.durations.LONG,
          });
        }

        setEmployees(response.data);
        // response.data ? setEmployees(response.data) : setEmployees([]);
        setIsLoading(true);
      })
      .catch((error) => {
        console.log({ error });
        Toast.show(`${error.message}`, { duration: Toast.durations.LONG });
      });
  };

  useEffect(() => {
    (async () => {
      const item = await SecureStore.getItemAsync("token");
      setToken(item);
    })();
    if (token !== null && token !== undefined) {
      getEmployees();
    }
  }, [token]);

  //   fix this
  // fix endpoint responses
  //  fix all
  const handleSubmit = (values, resetForm) => {
    console.log(JSON.stringify(values));
    console.log({ token });
    fetch(`${API_URL}/employers/generate-invoice`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then(async (response) => {

        if (response.status === 200) {
          Toast.show(response.message, {
            duration: Toast.durations.LONG,
          });
          navigation.navigate("Invoice-PDF", { invoice: response.data });
        }

        if (response.status === 400) {
          Toast.show(response.error, {
            duration: Toast.durations.LONG,
          });
        }
        resetForm();
       
      })
      .catch((error) => {
        console.log(error);
        Toast.show(error.error, { duration: Toast.durations.LONG });
      });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ padding: 20 }}>
        <Formik
          initialValues={{
            userId: "",
            accountNumber: "",
            bank: "",
            address: "",
            abn: "",
            bsb: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
            isValid,
            ...props
          }) => (
            <>
              <Menu
                visible={values.menuVisible}
                onDismiss={() => setFieldValue("menuVisible", false)}
                anchor={
                  <TextInput
                    mode="outlined"
                    label="Employee"
                    value={
                      employees.find((e) => e.id === values.userId)?.firstName || ""
                    }
                    onFocus={() => setFieldValue("menuVisible", true)}
                    onChangeText={() => {}}
                    activeOutlineColor="#276ef1"
                    blurOnSubmit
                    outlineColor="#276ef1"
                    style={[styles.input, themeTextStyle]}
                    theme={{ colors: { text: themeTextStyle } }}
                    textColor={themeTextStyle}
                    error={touched.userId && !!errors.userId}
                  />
                }
              >
                {employees.map((employee) => (
                  <Menu.Item
                    key={employee.id}
                    onPress={() => {
                      setFieldValue("userId", employee.id);
                      setFieldValue("menuVisible", false);
                    }}
                    title={employee.firstName}
                  />
                ))}
              </Menu>
              {touched.userId && errors.userId && (
                <Text style={{ color: "red" }}>{errors.userId}</Text>
              )}

              <TextInput
                mode="outlined"
                label="Account Number"
                value={values.accountNumber}
                onChangeText={handleChange("accountNumber")}
                onBlur={handleBlur("accountNumber")}
                activeOutlineColor="#276ef1"
                blurOnSubmit
                outlineColor="#276ef1"
                style={[styles.input, themeTextStyle]}
                theme={{ colors: { text: themeTextStyle } }}
                textColor={themeTextStyle}
                error={touched.accountNumber && !!errors.accountNumber}
              />
              {touched.accountNumber && errors.accountNumber && (
                <Text style={{ color: "red" }}>{errors.accountNumber}</Text>
              )}

              <TextInput
                mode="outlined"
                label="Bank"
                value={values.bank}
                onChangeText={handleChange("bank")}
                onBlur={handleBlur("bank")}
                activeOutlineColor="#276ef1"
                blurOnSubmit
                outlineColor="#276ef1"
                style={[styles.input, themeTextStyle]}
                theme={{ colors: { text: themeTextStyle } }}
                textColor={themeTextStyle}
                error={touched.bank && !!errors.bank}
              />
              {touched.bank && errors.bank && (
                <Text style={{ color: "red" }}>{errors.bank}</Text>
              )}

              <TextInput
                mode="outlined"
                label="Address"
                value={values.address}
                onChangeText={handleChange("address")}
                onBlur={handleBlur("address")}
                activeOutlineColor="#276ef1"
                blurOnSubmit
                outlineColor="#276ef1"
                style={[styles.input, themeTextStyle]}
                theme={{ colors: { text: themeTextStyle } }}
                textColor={themeTextStyle}
                error={touched.address && !!errors.address}
              />
              {touched.address && errors.address && (
                <Text style={{ color: "red" }}>{errors.address}</Text>
              )}

              <TextInput
                mode="outlined"
                label="ABN"
                value={values.abn}
                onChangeText={handleChange("abn")}
                onBlur={handleBlur("abn")}
                activeOutlineColor="#276ef1"
                blurOnSubmit
                outlineColor="#276ef1"
                style={[styles.input, themeTextStyle]}
                theme={{ colors: { text: themeTextStyle } }}
                textColor={themeTextStyle}
                error={touched.abn && !!errors.abn}
              />
              {touched.abn && errors.abn && (
                <Text style={{ color: "red" }}>{errors.abn}</Text>
              )}

              <TextInput
                mode="outlined"
                label="BSB"
                value={values.bsb}
                onChangeText={handleChange("bsb")}
                onBlur={handleBlur("bsb")}
                activeOutlineColor="#276ef1"
                blurOnSubmit
                outlineColor="#276ef1"
                style={[styles.input, themeTextStyle]}
                theme={{ colors: { text: themeTextStyle } }}
                textColor={themeTextStyle}
                error={touched.bsb && !!errors.bsb}
              />
              {touched.bsb && errors.bsb && (
                <Text style={{ color: "red" }}>{errors.bsb}</Text>
              )}

              <Button
                onPress={handleSubmit}
                mode="contained"
                uppercase={false}
                style={styles.submit}
                loading={props.isSubmitting}
                // disabled={!isValid}
                textColor="#ffffff"
                labelStyle={buttonTextStyle}
              >
                Generate Invoice
              </Button>
            </>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateInvoice;
