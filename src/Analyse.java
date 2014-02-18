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
        new Thread(new controller(new Analyse())).start();

        Socket client  = new Socket("localhost",14333);
        OutputStreamWriter OutputStreamWriter = new OutputStreamWriter(client.getOutputStream());
        OutputStreamWriter.write("Start");
        OutputStreamWriter.close();
        client.close();

        client  = new Socket("localhost",14333);
        OutputStreamWriter = new OutputStreamWriter(client.getOutputStream());
        OutputStreamWriter.write("Stop");
        OutputStreamWriter.close();
        client.close();
    }
}

class controller implements Runnable{
    private ServerSocket serverSocket;
    private String command;
    private Analyse analyse;

    controller(Analyse analyse){
        this.analyse = analyse;
    }

    @Override
    public void run() {
        try {
            serverSocket  = new ServerSocket(14333);
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

    public void control(Analyse analyse,String command){
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
}

interface Command{
    void execute();
}

class Start implements Command{
    public Start(){}
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
    public Stop(){}
    private Analyse analyse;
    public Stop(Analyse analyse){
        this.analyse = analyse;
    }
    @Override
    public void execute() {
        analyse.stop();
    }
}

