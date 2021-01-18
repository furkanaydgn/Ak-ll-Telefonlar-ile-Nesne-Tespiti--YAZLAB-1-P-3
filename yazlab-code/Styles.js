import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  containerText: {
    backgroundColor: "#eaeaea",
  },

  container2: {
    flex: 1,
    height: null,
    width: null,
    alignItems: "center",
    justifyContent: "center",
  },
  Button: {
    top: 70,
    left: 40,
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    elevation: 6,
  },
  container: {
    flex: 1,
  },
  camera: {
   
    justifyContent:"flex-start",
    width: 250, height: 250,
    top:1,
   
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 12,
    color: "white",
  },
});

export default styles;
