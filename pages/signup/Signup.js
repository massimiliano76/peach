import React, { Component } from "react";
import { View, StyleSheet, Keyboard, ActivityIndicator } from "react-native";
import * as eva from "@eva-design/eva";
import { KeyboardAvoidingView } from "../login/3rd-party";
import { Layout, Input, Icon, Text, Button } from "@ui-kitten/components";
import DateTimePicker from "@react-native-community/datetimepicker";
import { API_URL } from "../../constant";
import { createAlert } from "../../components/Alert";

const LockIcon = (props) => <Icon name="lock" {...props} />;

const EmailIcon = (props) => <Icon name="email" {...props} />;

const PersonIcon = (props) => <Icon name="person" {...props} />;

const CalendarIcon = (props) => <Icon name="calendar" {...props} />;

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastname: "",
      showLastnameError: true,
      firstname: "",
      showFirstnameError: true,
      email: "",
      showEmailError: true,
      password: "",
      showPasswordError: true,
      confirm_password: "",
      showConfirmPasswordError: false,
      datepicker: new Date(),
      date_of_birth: "JJ/MM/AAAA",
      showDateofbirthError: true,
      show: false,
      loading: false,
      passwordMessage:
        "Une majuscule, une minuscule, un chiffre, un caractère spéciale et 8 caractères minimum.",
    };
  }
  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerContainer}>
          <Text category="h1" status="control" style={styles.headerText}>
            Inscription
          </Text>
          {this.state.loading == false ? (
            <></>
          ) : (
            <ActivityIndicator size="large" color="#fff" />
          )}
        </View>
        <Layout style={styles.formContainer} level="1">
          <Input
            placeholder="Prénom"
            accessoryRight={PersonIcon}
            disabled={this.state.loading}
            value={this.state.firstname}
            onChangeText={this.setFirstname}
            status={this.state.showFirstnameError ? "danger" : "success"}
            caption={this.state.showFirstnameError ? "Prénom non valide" : ""}
          />
          <Input
            placeholder="Nom"
            style={styles.inputs}
            accessoryRight={PersonIcon}
            value={this.state.lastname}
            onChangeText={this.setLastname}
            status={this.state.showLastnameError ? "danger" : "success"}
            caption={this.state.showLastnameError ? "Nom non valide" : ""}
          />
          <Input
            placeholder="Date de naissance"
            style={styles.inputs}
            accessoryRight={CalendarIcon}
            disabled={this.state.loading}
            value={this.state.date_of_birth}
            ref="datepicker"
            onFocus={this.showDatePicker}
            onChange={this.showDatePicker}
            status={this.state.showDateofbirthError ? "danger" : "success"}
            caption={
              this.state.showDateofbirthError
                ? "Date de naissance non valide"
                : ""
            }
          />
          {this.state.show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={this.state.datepicker}
              mode="date"
              display="calendar"
              onChange={this.setDateOfBirth}
            />
          )}
          <Input
            placeholder="E-mail"
            autoCapitalize="none"
            style={styles.inputs}
            accessoryRight={EmailIcon}
            disabled={this.state.loading}
            value={this.state.email}
            onChangeText={this.setEmail}
            status={this.state.showEmailError ? "danger" : "success"}
            caption={
              this.state.showEmailError ? "Adresse e-mail non valide" : ""
            }
          />
          <Input
            placeholder="Mot de passe"
            style={styles.inputs}
            accessoryRight={LockIcon}
            value={this.state.password}
            disabled={this.state.loading}
            secureTextEntry={true}
            onChangeText={this.setPassword}
            status={this.state.showPasswordError ? "danger" : "success"}
            caption={
              this.state.showPasswordError ? this.state.passwordMessage : ""
            }
          />
          <Input
            placeholder="Confirmation du mot de passe"
            style={styles.inputs}
            accessoryRight={LockIcon}
            value={this.state.confirm_password}
            disabled={this.state.loading}
            secureTextEntry={true}
            onChangeText={this.setConfirmPassword}
            status={this.state.showConfirmPasswordError ? "danger" : "success"}
            caption={
              this.state.showConfirmPasswordError
                ? "Les mots de passe ne correspondent pas"
                : ""
            }
          />
        </Layout>
        <Button
          style={styles.signUpButton}
          disabled={this.state.loading}
          onPress={this.onSignUp}
          size="giant"
        >
          INSCRIPTION
        </Button>
        <Button
          style={styles.signInButton}
          disabled={this.state.loading}
          appearance="ghost"
          status="basic"
          onPress={this.onSignInButtonPress}
        >
          Déjà inscrit ? Connectez-vous !
        </Button>
      </KeyboardAvoidingView>
    );
  }

  setLastname = (value) => {
    if (value.length <= 1) {
      this.setState({
        lastname: value,
        showLastnameError: true,
      });
    } else {
      this.setState({
        lastname: value,
        showLastnameError: false,
      });
    }
  };

  setFirstname = (value) => {
    if (value.length <= 1) {
      this.setState({
        firstname: value,
        showFirstnameError: true,
      });
    } else {
      this.setState({
        firstname: value,
        showFirstnameError: false,
      });
    }
  };

  showDatePicker = () => {
    this.setState({
      show: true,
    });
  };

  setDateOfBirth = (event, selectedDate) => {
    if (this.state.date_of_birth == "JJ/MM/AAAA") {
      this.setState({
        showDateofbirthError: true,
        show: false,
      });
    }
    if (selectedDate != undefined) {
      let day = selectedDate.getDate();
      if (day < 10) day = "0" + day;
      let month = selectedDate.getMonth() + 1;
      if (month < 10) month = "0" + month;
      let year = selectedDate.getFullYear();
      this.setState({
        datepicker: selectedDate,
        date_of_birth: day + "/" + month + "/" + year,
        show: false,
      });
      if (year <= 2007) {
        this.setState({
          showDateofbirthError: false,
        });
      } else {
        this.setState({
          showDateofbirthError: true,
        });
      }
    }
    this.refs.datepicker.blur();
  };

  setEmail = (value) => {
    let regex = /\S+@\S+\.\S+/;
    if (!regex.test(value)) {
      this.setState({
        email: value,
        showEmailError: true,
      });
    } else {
      this.setState({
        email: value,
        showEmailError: false,
      });
    }
  };

  setPassword = (value) => {
    let regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[()~\][{}_|#?!@$%^&=+€*-]).{8,32}$/;
    if (!regex.test(value)) {
      this.setState({
        password: value,
        showPasswordError: true,
      });
    } else {
      this.setState({
        password: value,
        showPasswordError: false,
      });
    }

    if (value != this.state.confirm_password) {
      this.setState({
        showConfirmPasswordError: true,
      });
    } else {
      this.setState({
        showConfirmPasswordError: false,
      });
    }
  };

  setConfirmPassword = (value) => {
    if (value != this.state.password) {
      this.setState({
        confirm_password: value,
        showConfirmPasswordError: true,
      });
    } else {
      this.setState({
        confirm_password: value,
        showConfirmPasswordError: false,
      });
    }
  };

  changeDate = (date) => {
    let date_array = date.split("/");
    return (
      date_array[2] +
      "-" +
      date_array[1] +
      "-" +
      date_array[0] +
      " " +
      "00:00:00"
    );
  };

  onSignUp = () => {
    Keyboard.dismiss();
    if (
      !this.state.showFirsnameError &&
      !this.state.showLastnameError &&
      !this.state.showDateofbirthError &&
      !this.state.showEmailError &&
      !this.state.showPasswordError &&
      !this.state.showConfirmPasswordError
    ) {
      this.setState({
        loading: true,
      });
      fetch(API_URL + "customer/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          last_name: this.state.lastname,
          first_name: this.state.firstname,
          email: this.state.email.toLowerCase(),
          password: this.state.password,
          password_confirmation: this.state.confirm_password,
          date_of_birth: this.changeDate(this.state.date_of_birth),
        }),
      })
        .then((response) => response.json())
        .then(async (response) => {
          this.setState({
            loading: false,
          });
          if (!response.error) {
            createAlert("Merci !", response.messages, false);
            this.setState({
              lastname: "",
              showLastnameError: true,
              firstname: "",
              showFirsnameError: true,
              email: "",
              showEmailError: true,
              password: "",
              showPasswordError: true,
              confirm_password: "",
              showConfirmPasswordError: true,
              datepicker: new Date(),
              date_of_birth: "JJ/MM/AAAA",
              showDateofbirthError: true,
              show: false,
            });
          } else {
            createAlert("Oups !", response.messages, false);
          }
        })
        .catch((e) => {
          this.setState({
            loading: false,
          });
          console.error(e);
        });
    } else {
      this.setState({
        loading: false,
      });
      createAlert("Oups !", "Veuillez saisir tous les champs !", true);
    }
  };

  onSignInButtonPress = () => {
    this.props.navigation.navigate("Login");
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: 175,
    backgroundColor: "#3366FF",
  },
  headerText: {
    marginBottom: 15,
  },
  formContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  inputs: {
    marginTop: 16,
  },
  signUpLabel: {
    marginTop: 16,
  },
  signUpButton: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  signInButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
  },
});
