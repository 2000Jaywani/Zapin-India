package com.example.ZapinAdmin.Service;

import com.example.ZapinAdmin.Entity.Div;
import com.example.ZapinAdmin.Entity.SubCategory;
import com.example.ZapinAdmin.Repository.DivRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DivService {
        @Autowired
        private DivRepository divRepository;

        public ResponseEntity<?> addDiv(String divName)
        {
                try{
                        Div div=new Div();
                        div.setDivName(divName);
                        divRepository.save(div);
                        return new ResponseEntity<>("Section Added Successfully. ", HttpStatus.OK);
                }
                catch (Exception e){
                        return new ResponseEntity<>("Internal Server Error. ", HttpStatus.INTERNAL_SERVER_ERROR);
                }
        }

        public ResponseEntity<List<Div>> getAllDiv(){
                List<Div> divList=divRepository.findAll();
                return new ResponseEntity<>(divList,HttpStatus.OK);
        }

}
