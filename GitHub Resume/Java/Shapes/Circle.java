//**************************************************
//Circle.java
//4/7/23
//A subclass and an extension of the Shape2D class
//**************************************************
import java.lang.Math;

public class Circle extends Shape2D {
    double radius;

    //Constructors
    public Circle(double radius) {
        this.radius = radius;
    }

    public Circle(double radius, String color, boolean filled) {
        super(color, filled);
        this.radius = radius;
    }


    //Getters and Setters
    public double getRadius() {
        return radius;
    }

    public void setRadius(double radius) {
        this.radius = radius;
    }
    //End of Getters and Setters
    
    //Area
    //Needed another String variable so we can print in the toString() method
    String areaString = "";
    @Override
    public String getArea() {
        double circleArea = radius * radius * Math.PI;
        areaString = String.valueOf(circleArea);
        return areaString;
    }

    //Circumference
    //Needed another String variable so we can print in the toString() method
    String perimeterString = "";
    @Override
    public String getPerimeter() {
        //double circleCircumference = 2 * Math.PI * radius;
        double circleCircumference = 2 * Math.PI * radius;
        perimeterString = String.valueOf(circleCircumference);
        return perimeterString;
    }
}