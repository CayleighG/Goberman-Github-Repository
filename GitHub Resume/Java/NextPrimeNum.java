//**************************************************
//NextPrimeNum.java
//2/17/23
//Allow the user to input two numbers (num1 and num2). 
//Find the next prime number (prime) that satisfies prime >= (num1 * num2).
//**************************************************
import java.util.Scanner;

public class NextPrimeNum {
    public static void main (String[] args) {
        Scanner input = new Scanner(System.in);
        System.out.print("Enter two integer numbers: ");
        int num1 = input.nextInt();
        int num2 = input.nextInt();
        boolean isPrime = false;
        int count = 0;
        int total = num1 * num2;
        int prime = 0;

        //Calculate the next prime number
        for (int x = 1; x <= (2 * num1 * num2); x++){
            if (isPrime == false) {
                for (int i = 2; i <= total / 2; i++) {
                    if (total % i == 0){
                        count++;
                        break;
                    }
                    count = 0;
                }
                if (count == 0 && total != 1){
                    prime = total;
                    isPrime = true;
                }

                total++;

            } else {
                break;
            }
        }
        //Print the next prime number
        System.out.println("The next prime number is: " + prime);
    }
}