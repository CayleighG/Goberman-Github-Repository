//**************************************************
//SquareRoot.java
//2/17/23
//Prompt the user to enter a positive integer, then display the square root of the integer. 
//Use a loop to repeatedly make a guess until the guess is close enough to the square root of the number.
//**************************************************
import java.util.Scanner;

public class SquareRoot {
    public static void main (String[] args) {
        Scanner input = new Scanner(System.in);
        System.out.print("Enter a positive integer: ");
        double num = input.nextInt();
        double sqrtNum = num / 2;
        double x = 0;

        //Calculate the square root
        do {
            x = sqrtNum;
            sqrtNum = 0.5 * (x + (num / x));
            System.out.println(sqrtNum);
        } while (Math.abs(x - sqrtNum) > 0.0000001);
        
        //Print the square root
        System.out.println("The sqrt(" + num + ") is " + sqrtNum);
    }
}