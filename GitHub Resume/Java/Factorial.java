//**************************************************
//Factorial.java
//2/23/23
//Write a method that calculates the factorial of an integer
//**************************************************
import java.util.Scanner;

public class Factorial {
    public static void main (String[] args) {
        Scanner input = new Scanner (System.in);
        //Input the integer
        System.out.print("Enter an integer: ");
        int n = input.nextInt();

        System.out.println(factorial(n));
    }

    public static long factorial(int n) {
        //Declaring strings we can use to print the calculation later
        String fact = "";
        String printFact = "";
        //Declaring an integer so we can use n's base value while changing n's actual value later on
        int nFact = n;

        //Noting if n is greater than 1; if not, then the factorial is 1
        if (n < 1) {
            n = 1;
        } else {
            for (int i = 1; i < nFact; i++){
                //Calculation
                n = n * i;
                //Adding the calculation to the string so we can print it at the end
                fact = fact + i + " * ";
                //Organize it into another string to be printed
                printFact = n + " = " + fact + (i + 1);
            }
            System.out.println(printFact);
        }
        System.out.print("The factorial of " + nFact + " is ");
        return n;
        
    }
}