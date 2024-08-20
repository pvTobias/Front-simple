// passinput.js
import React, { useState } from 'react';
import Input from './input'; // Asegúrate de que la ruta sea correcta

const PassInput = (props) => {
    const { label, value, onChange } = props;
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Input
            label={label}
            value={value}
            onChange={onChange}
            icon={showPassword ? "eye-off" : "eye"}
            secureTextEntry={!showPassword}
            onIconPress={() => setShowPassword(!showPassword)}
        />
    );
};

export default PassInput;


// passinput.js
// import React, { useState } from 'react';
// import { TextInput } from 'react-native-paper';
// import { primaryColor } from '../config/colors';

// const PassInput = (props) => {
//     const { label, value, onChange, icon } = props;
//     const [showPassword, setShowPassword] = useState(false);

//     return (
//         <TextInput
//             label={label}
//             value={value}
//             onChangeText={(text) => onChange(text)}
//             mode="outlined"
//             textColor="black"
//             secureTextEntry={!showPassword}
//             activeOutlineColor={primaryColor}
//             style={{ marginVertical: 5 }}
//             right={
//                 <TextInput.Icon 
//                     icon={showPassword ? "eye-off" : "eye"} 
//                     onPress={() => setShowPassword(!showPassword)}
//                 />
//             }
//         />
//     );
// };

// export default PassInput;
