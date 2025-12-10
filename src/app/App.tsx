import { AuthProvider } from "../providers/auth/AuthProvider";
import { UserProvider } from "../store/user.store";
import "./Reset.css";
import RoutesLayout from "./RoutesLayout";
import { BrowserRouter } from "react-router";

function App() {

    return(
		<AuthProvider>
			<UserProvider>
				<BrowserRouter>
					<RoutesLayout/>
				</BrowserRouter>
			</UserProvider>	
		</AuthProvider>
		
	)
		
}

export default App;
