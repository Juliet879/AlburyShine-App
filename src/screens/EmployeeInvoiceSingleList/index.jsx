import React, {useState, useEffect} from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
  } from "react-native";
  import { Divider, List, ActivityIndicator} from "react-native-paper";
import { API_URL } from "@env";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-root-toast";
import styles from "./styles";

const EmployeeInvoiceSingleList = ({navigation})=>{
    const [invoices, setInvoices] = useState([]);
    const [loading, setIsLoading] = useState(true);
    const [token, setToken] = useState(null);
    const [employeeId, setEmployeeId] = useState();
  

    useEffect(() => {

  
        (async () => {
          const item = await SecureStore.getItemAsync("token");
          setToken(item);
          const id = await SecureStore.getItemAsync("id");
          setEmployeeId(id);
         
        })();
        if (token !== null && token !== undefined) {
          getInvoice();
    
    
        }
    
      }, [token]);

    const getInvoice = () => {
        const headers = {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        };
        fetch(`${API_URL}/employee/employee-invoices/${employeeId}`, {
          headers,
        })
          .then((response) => response.json())
          .then(async (response) => {
            if (response.status === 403 || response.status === 401) {
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
            if (response.success === false) {

              Toast.show(response.error, {
                duration: Toast.durations.LONG,
              });
            }
          
            setInvoices(response.data);
            setIsLoading(true);
          })
          .catch((error) => {
            Toast.show(`${error.message}`, { duration: Toast.durations.LONG });
          });
      };
      if (loading !== true) {
        return (
          <>
            <ActivityIndicator
              animating={true}
              color="#276EF1"
              size="large"
              style={styles.activity}
            />
            <Text style={styles.activityText}>Loading ...</Text>
          </>
        );
      }
      if(invoices.length === 0){
        return (
          <>
            <Text style={styles.activityText}>No Invoice found</Text>
          </>
        );
      }
    
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <Text style={styles.title}>Invoices</Text>
    
          <SafeAreaView>
            {/* <Text style={styles.heading}>Tasks</Text> */}
            <FlatList
              data={invoices}
              renderItem={({ item }) => (
                <View
                  style={{ flexDirection: "row", justifyContent: "space-between" }}
                >
                  <TouchableOpacity
                    key={item.invoiceId}
                    style={{ width: "62%" }}
                    onPress={() => {
                      navigation.navigate("Invoice-PDF", { invoice: item.data });
                    }}
                  >
                    <List.Item
                      title={
                        <Text style={{ color: "#333235" }}>
                          {new Date(item.createdAt?._seconds * 1000 + item.createdAt?._nanoseconds / 1000000).toLocaleDateString()}
                        </Text>
                      }
                      left={() => (
                        <>
                          <List.Icon icon="file-invoice-dollar" color="#276EF1" />
                        </>
                      )}
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
          </SafeAreaView>
          <Divider />
        </View>
      );
}
export default EmployeeInvoiceSingleList;