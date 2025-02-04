//**************************************************
//Cube.java
//4/7/23
//A subclass and an extension of the Shape3D class
//**************************************************

public class Cube extends Shape3D {
    private double width;

    //Constructors
    public Cube(double width) {
        this.width = width;
    }

    public Cube(double width, String color, boolean filled) {
        super(color, filled);
        this.width = width;
    }
    
    //Getters and Setters
    public double getWidth() {
        return width;
    }

    public void setWidth(double Width) {
        this.width = width;
    }

    //Total Surface Area
    String areaString = "";
    @Override
    public String getSurfaceArea() {
        double cubeArea = 6 * (width * width);
        areaString = String.valueOf(cubeArea);
        return areaString;
    }

    //Volume
    String volumeString = "";
    @Override
    public String getVolume() {
        double cubeVolume = width * width * width;
        volumeString = String.valueOf(cubeVolume);
        return volumeString;
    }  
}