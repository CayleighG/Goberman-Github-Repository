//**************************************************
//ReverseLetterCase.java
//2/24/23
//Takes an inputted string and reverses the case of each letter
//**************************************************
import java.util.Scanner;

public class ReverseLetterCase {
    public static void main (String[] args) {
        Scanner input = new Scanner (System.in);
        System.out.print("Enter a string: ");
        String str = input.nextLine();

        str = reverseCase(str);
        System.out.println("The new string is: " + str);
    }

    public static String reverseCase(String str) {

        //Added a new string that will take the changes from str and save them to be applied to str at the end
        //Otherwise, the code will detect the newly changed letter in str and change it back to its previous case
        //(Ex: 'a' is changed to 'A'. The next line changes it back to 'a' before 'i' can update)
        String newStr = "";

        for (int i = 0; i < str.length(); i++){
            //if statement detects if the character is a capital, lowercase, or other, the runs the desired code
            if (str.charAt(i) >= 'a' && str.charAt(i) <= 'z') {
                //Have to inlude the Character.toUpperCase or else it capitalizes all of the remaining letters.
                newStr = newStr + Character.toUpperCase(str.charAt(i));

            } else if (str.charAt(i) >= 'A' && str.charAt(i) <= 'Z') {
                //Have to inlude the Character.toLowerCase or else it lowercases all of the remaining letters.
                newStr = newStr + Character.toLowerCase(str.charAt(i));

            } else {
                //Added this else statement so it doesn't ignore numbers or other symbols
                newStr = newStr + str.charAt(i);
            }
        }
        //Applies the changed newStr to str so it can be returned and printed
        str = newStr;
        return str;

    }
}