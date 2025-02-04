//**************************************************
//Shape.java
//4/7/23
//Creating Shape classes
//**************************************************

public abstract class Shape {
    String color;
    boolean filled;

    //Constructors
    public Shape() {
    }

    public Shape(String color, boolean filled) {
        this.color = color;
        this.filled = filled;
    }

    //Getters and Setters
    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public boolean isFilled() {
        return filled;
    }

    public void setFilled(boolean filled) {
        this.filled = filled;
    }
    //End of Getters and Setters
    
    //toString()
    @Override
    public String toString() {
        return "Shape [color = " + color + ", filled = " + filled + "]";
    }
}