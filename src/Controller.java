
import java.io.*;
import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.concurrent.Executor;

/**
 * Created with IntelliJ IDEA.
 * User: BearBB
 * Date: 14-2-18
 * Time: 下午9:19
 * To change this template use File | Settings | File Templates.
 */



public class Controller<T> implements Runnable{

    private ServerSocket serverSocket;
    private String command;
    private T t;
    private String host = "localhost";
    private int port = 1234;

    @Override
    public void run() {
        try {
            serverSocket  = new ServerSocket(port);
            while(true){
                Socket socket = serverSocket.accept();
                InputStreamReader reader = new InputStreamReader(socket.getInputStream());
                BufferedReader bufferedReader = new BufferedReader(reader);
                command = bufferedReader.readLine();
                control(t,command);
                reader.close();
                bufferedReader.close();
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void control(T t,String command){
        if(!command.isEmpty()){
            try {
                Class cls = Class.forName(command);
                Constructor[] constructor=cls.getDeclaredConstructors();
                Executor executor = (Executor)cls.getDeclaredConstructor(constructor[0].getParameterTypes())
                        .newInstance(t);
                executor.execute(null);
            } catch (ClassNotFoundException e) {
                e.printStackTrace();
            } catch (InstantiationException e) {
                e.printStackTrace();
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            } catch (NoSuchMethodException e) {
                e.printStackTrace();
            } catch (InvocationTargetException e) {
                e.printStackTrace();
            }
        }
    }

    public void orderAcceptedBy(T t){
        this.t = t;
        new Thread(this).start();
    }

    public void giveOrder(String order){
        Socket client  = null;
        OutputStreamWriter outputStreamWriter = null;
        try {
            client = new Socket(host,port);
            outputStreamWriter = new OutputStreamWriter(client.getOutputStream());
            outputStreamWriter.write(order);
            outputStreamWriter.close();
            client.close();
        } catch (IOException e) {
            e.printStackTrace();
            if (client != null) {
                try {
                    client.close();
                    client = null;
                } catch (IOException e1) {
                    e1.printStackTrace();
                }
            }
            if (outputStreamWriter != null) {
                try {
                    outputStreamWriter.close();
                    outputStreamWriter = null;
                } catch (IOException e1) {
                    e1.printStackTrace();
                }
            }
        }

    }


//        public static void main(String[] args) throws IOException, NoSuchMethodException {
//            Controller controller = new Controller();
//            controller.orderAcceptedBy(new Analyse());
//            controller.giveOrder("Start");
//            controller.giveOrder("Stop");
//        }

}





