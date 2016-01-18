package com.springapp.mvc;

import com.mysql.jdbc.JDBC4ResultSet;
import com.mysql.jdbc.RowDataStatic;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.sql.*;
import java.util.ArrayList;

@Controller
@RequestMapping("/")
public class HelloController {
    @RequestMapping(method = RequestMethod.GET)
    public String printWelcome(ModelMap model) {

        try {
            Class.forName("com.mysql.jdbc.Driver");

            Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/test", "localuser", "localuser");

            Statement stmt = con.createStatement();

            ResultSet rs = stmt.executeQuery("SELECT count(*) from User");

            String result = "";
            while (rs.next()) {
                result += rs.getInt(1);
            }

            model.addAttribute("message", "Hello world! gogogo" + result);

            con.close();
        } catch (Exception exception) {
            exception.printStackTrace();
        }


        return "hello";
    }
}