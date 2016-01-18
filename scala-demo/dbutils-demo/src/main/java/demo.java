import org.apache.commons.dbutils.DbUtils;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanListHandler;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.List;

public class demo {
    private static String driveClassName = "com.mysql.jdbc.Driver";
    private static String url = "jdbc:mysql://XXX:3306/AAA?useUnicode=true&characterEncoding=utf8";
    private static String user = "BBB";
    private static String password = "CCC";

    public static Connection getConnection() {
        Connection connection = null;

        try {
            Class.forName(driveClassName);
        } catch (ClassNotFoundException e) {
            System.out.println("load driver failed!");
            e.printStackTrace();
        }

        try {
            connection = DriverManager.getConnection(url, user, password);
        } catch (SQLException exception) {
            System.out.println("connect failed!");
            exception.printStackTrace();
        }

        return connection;
    }

    public List<User> queryUsers(int userId) {
        QueryRunner run = new QueryRunner();
        java.sql.Connection connection = getConnection();
        try {
            return run.query(connection, "select * from users where id=?", new BeanListHandler<User>(User.class), userId);
        } catch (Exception exception) {
            return null;
        } finally {
            DbUtils.closeQuietly(connection);
        }
    }
}
