import {createContext} from "react";

export const MyContext = createContext("");

// export const MyContext = ({children}) => {
//     const [storename, setStorename] = useState("");
//
//     return (
//         <MyContext.Provider value={{storename, setStorename}}>
//             {children}
//         </MyContext.Provider>
//     )
// }
