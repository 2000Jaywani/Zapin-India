package com.example.ZapinAdmin.Service;

import com.example.ZapinAdmin.Entity.User;
import com.example.ZapinAdmin.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
@Service
public class UserService {
    @Autowired
    UserRepository userRepository;
    public ResponseEntity<?> userLogin(User user) {
        User byUserName = userRepository.findByUserName(user.getUserName());
        User byPassword  = userRepository.findByPassword(user.getPassword());
        //User byRole = userRepository.findByRole(user.getRole());
        if (byUserName == null) {
            return new ResponseEntity<>("User not found with this username.", HttpStatus.BAD_REQUEST);
        }
        if (byPassword == null || !byPassword.getPassword().equals(user.getPassword())) {
            return new ResponseEntity<>("Invalid password.", HttpStatus.BAD_REQUEST);
        }
//        if (byRole == null || !byRole.getRole().equals(user.getRole())) {
//            return new ResponseEntity<>("Invalid role.", HttpStatus.BAD_REQUEST);
//        }
        return new ResponseEntity<>("User Admin login successfully", HttpStatus.OK);
    }
}








































//        if(user.getUserName().equalsIgnoreCase(byUserName.getUserName()) &&
//           user.getPassword().equalsIgnoreCase(byPassword .getPassword()) &&
//           user.getRole().equalsIgnoreCase(byRole.getRole()) )
//        {
//            return new ResponseEntity<>("User Admin login successfully", HttpStatus.OK);
//        }
//            return new ResponseEntity<>("username and password is invalid.", HttpStatus.BAD_REQUEST);
