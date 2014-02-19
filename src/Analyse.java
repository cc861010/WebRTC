import java.io.*;
import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.net.ServerSocket;
import java.net.Socket;

/**
 * Created with IntelliJ IDEA.
 * User: BearBB
 * Date: 14-2-18
 * Time: 下午9:19
 * To change this template use File | Settings | File Templates.
 */
public class Analyse {
    public void start(){
       System.out.println("start---->");
    }
    public void stop(){
        System.out.println("stop---->");
    }
    public static void main(String[] args) throws IOException, NoSuchMethodException {
        Controller controller = new Controller();
        controller.orderAcceptedBy(new Analyse());
        controller.giveOrder("Start");
        controller.giveOrder("Stop");
    }
}



class Controller implements Runnable{
    private ServerSocket serverSocket;
    private String command;
    private Analyse analyse;
    private String host = "localhost";
    private int port = 1433;

    @Override
    public void run() {
        try {
            serverSocket  = new ServerSocket(port);
            while(true){
                Socket socket = serverSocket.accept();
                InputStreamReader reader = new InputStreamReader(socket.getInputStream());
                BufferedReader bufferedReader = new BufferedReader(reader);
                command = bufferedReader.readLine();
                control(analyse,command);
                reader.close();
                bufferedReader.close();
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void control(Analyse analyse,String command){
        if(!command.isEmpty()){
            try {
                Class cls = Class.forName(command);
                Constructor[] constructor=cls.getDeclaredConstructors();
                Command cmd = (Command)cls.getDeclaredConstructor(new Class[] { Analyse.class }).newInstance(new Object[]{analyse});
                cmd.execute();
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

    public void orderAcceptedBy(Analyse analyse){
        this.analyse = analyse;
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
                } catch (IOException e1) {
                    client = null;
                    e1.printStackTrace();
                }
            }
            if (outputStreamWriter != null) {
                try {
                    outputStreamWriter.close();
                } catch (IOException e1) {
                    outputStreamWriter = null;
                    e1.printStackTrace();
                }
            }
        }

    }

}

interface Command{
    void execute();
}

class Start implements Command{
    private Analyse analyse;
    public Start(Analyse analyse){
        this.analyse = analyse;
    }
    @Override
    public void execute() {
        analyse.start();
    }
}

class Stop implements Command{
    private Analyse analyse;
    public Stop(Analyse analyse){
        this.analyse = analyse;
    }
    @Override
    public void execute() {
        analyse.stop();
    }
}

