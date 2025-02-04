//**************************************************
//Cylinder.java
//4/7/23
//A subclass and an extension of the Shape3D class
//**************************************************
import java.lang.Math;

public class Cylinder extends Shape3D {
    private double height;
    private double radius;

    //Constructors
    public Cylinder(double radius, double height) {
        this.radius = radius;
        this.height = height;
    }

    public Cylinder(double radius, double height, String color, boolean filled) {
        super(color, filled);
        this.height = height;
        this.radius = radius;
    }

    //Getters and Setters
    public double getHeight() {
        return height;
    }

    public void setHeight(double height) {
        this.height = height;
    }

    public double getRadius() {
        return radius;
    }

    public void setRadius(double radius) {
        this.radius = radius;
    }
    //End of Getters and Setters

    //Total Surface Area
    String areaString = "";
    @Override
    public String getSurfaceArea() {
        double cylinderArea = 2 * Math.PI * radius * (radius + height);
        areaString = String.valueOf(cylinderArea);
        return areaString;
    }

    //Volume
    String volumeString = "";
    @Override
    public String getVolume() {
        double cylinderVolume = Math.PI * (radius * radius) * height;
        volumeString = String.valueOf(cylinderVolume);
        return volumeString;
    }  
}