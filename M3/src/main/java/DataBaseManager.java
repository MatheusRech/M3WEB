/**
 *
 * @author Matheus
 */

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DataBaseManager {

    static public Connection conectaBD() throws ClassNotFoundException, SQLException {
        String url ="jdbc:mysql://localhost:3306/m3?useSSL=false&serverTimezone=UTC";
        String user ="root";
        String passwd = "roletador44";
        Class.forName("com.mysql.cj.jdbc.Driver");
        Connection con = DriverManager.getConnection(url, user, passwd);
        return con ;
    }
}
