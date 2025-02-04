//**************************************************
//CharacterList.java
//3/3/23
//Read text from the user and returns a list of the characters that are in the text 
//Along with a count of how many times each character appears
//**************************************************
import java.util.Scanner;

public class CharacterList {
    public static void main (String[] args) {
        Scanner input = new Scanner(System.in);
        System.out.print("Enter the text to analyze: ");
        String str = input.nextLine();
        
        System.out.println("The characters in the text are: ");
        System.out.println(charCount(str));
    }
    public static String charCount(String str) {
        //Declare an array to store the characters and an array to store the counts of the characters
        char[] chars = str.toCharArray();
        //Gave count a lot of space to store counts for long strings
        int[] count = new int[256];
        //This requires a string to be returned, so I have it return a blank string so the functions will run
        String toBeReturned = "";

        //Calculations, character detection, and printing results
            for (int i = 0; i < str.length(); i++) {
                count [str.charAt(i)]++;
            }
    
            for (int i = 0; i < str.length(); i++) {
                chars[i] = str.charAt(i);
                int match = 0;
    
                for (int x = 0; x <= i; x++) {
                    if (str.charAt(i) == chars[x]) {
                        match++;
                    }
                }
    
                if (match == 1) {
                    //Ensures the code will not print anything that is not a letter (spaces, punctuation, etc)
                    if ((str.charAt(i) >= 'a' && str.charAt(i) <= 'z') || (str.charAt(i) >= 'A' && str.charAt(i) <= 'Z')) {
                        System.out.println(str.charAt(i) + " : " + count[str.charAt(i)]);
                    }
                }
            }
        return toBeReturned;
    }
}