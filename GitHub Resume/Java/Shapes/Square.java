//**************************************************
//Square.java
//4/7/23
//A subclass and an extension of the Shape2D class
//**************************************************

public class Square extends Shape2D {
    double width;

    //Constructors
    public Square(double width) {
        this.width = width;
    }

    public Square(double width, String color, boolean filled) {
        super(color, filled);
        this.width = width;
    }
    
    //Getters and Setters
    public double getWidth() {
        return width;
    }

    public void setWidth(double width) {
        this.width = width;
    }
    //End of Getters and Setters

    //Area
    String areaString = "";
    @Override
    public String getArea() {
        double squareArea = width * width;
        areaString = String.valueOf(squareArea);
        return areaString;
    }

    //Perimeter
    String perimeterString = "";
    @Override
    public String getPerimeter() {
        //perimeter = 2(side a + side b), but since all sides are the same we can simplify to width * 4
        double squarePerimeter = width * 4;
        perimeterString = String.valueOf(squarePerimeter);
        return perimeterString;
    }
}