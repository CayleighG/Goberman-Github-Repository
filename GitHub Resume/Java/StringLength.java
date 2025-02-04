//StringLength.java
//4/13/23
//Displays the length of an inputted string
//**************************************************
import java.util.Scanner;

public class StringLength {
    public static void main(String[] args) {
        int count = 0;
        Scanner input = new Scanner(System.in);

        while (true) {
            System.out.print("Enter a line of text with only numbers or letters: ");
            String userString = input.nextLine();
            
            for (int i=0; i < userString.length(); i++) {
                try {
                    if ((userString.charAt(i) >= 'A' && userString.charAt(i) <='Z')||
                        (userString.charAt(i) >= 'a' && userString.charAt(i) <='z')||
                        (userString.charAt(i) <= '9' && userString.charAt(i) >= '0')) {
                        count++;
                    } else {
                        throw new IllegalArgumentException();
                    }
                } catch (IllegalArgumentException e) {
                    System.out.println("'" + userString.charAt(i) + "' is not a letter or a number. Please try again.");
                    input.nextLine();
                }
            }
            break;
        }
        System.out.println("This string is " + count + " characters long.");
    }
}