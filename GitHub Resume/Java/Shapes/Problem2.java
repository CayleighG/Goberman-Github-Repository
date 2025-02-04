//**************************************************
//Problem2.java
//4/7/23
//Abstract classes and interfaces
//**************************************************

import java.util.ArrayList;

public class Problem2 {
    public static void main(String[] args) {
        ArrayList<Shape> shapes = new ArrayList<>();
        shapes.add(new Circle(5));
        shapes.add(new Square(5));
        shapes.add(new Cylinder(5, 10));
        shapes.add(new Cube(5));
        for (Shape shape : shapes) {
            if (shape instanceof Shape2D) {
                System.out.println("This is a 2D shape");
                System.out.println("Area: " + ((Shape2D)shape).getArea());
                System.out.println("Perimeter: " + ((Shape2D)shape).getPerimeter());
            }
            else if (shape instanceof Shape3D) {
                System.out.println("This is a 3D shape");
                System.out.println("Volume: " + ((Shape3D)shape).getVolume());
                System.out.println("Surface Area: "+ ((Shape3D)shape).getSurfaceArea());
            }
            System.out.println(shape);
        }
    }
}
