//**************************************************
//AirlinePassengerDemo.java
//3/23/23
//Test of AirlinePassenger.java and Booking.java
//**************************************************

import java.util.Scanner;
import java.util.Date;
import java.util.Calendar;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Random;

public class AirlinePassengerDemo {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        //Strings
        System.out.print("First Name: ");
        String firstName = input.nextLine();
        System.out.print("Last Name: ");
        String lastName = input.nextLine();
        System.out.print("Mobile Number: ");
        String mobileNumber = input.nextLine();
        System.out.print("Title of Flight: ");
        String title = input.nextLine();
        System.out.print("Frequent Flyer Number: ");
        String frequentFlyerNumber = input.nextLine();
        System.out.print("Nationality: ");
        String nationality = input.nextLine();
        System.out.print("Passport Number: ");
        String passportNumber = input.nextLine();
        System.out.print("Passport Country: ");
        String passportCountry = input.nextLine();
        System.out.print("Flight Number: ");
        String flightNumber = input.nextLine();
        String bookingNumber = "";
        String seatNumber = "";

        //LocalDateTime
        LocalDateTime bookingDateTime = LocalDateTime.now();

        //Dates
        //Date of Birth: 
        System.out.print("Year Born: ");
        int dobYear = input.nextInt();
        System.out.print("Month Born (numerical form): ");
        int dobMonth = input.nextInt();
        System.out.print("Day Born: ");
        int dobDay = input.nextInt();

        Calendar cDOB = Calendar.getInstance();
        cDOB.set(Calendar.MONTH, dobMonth - 1);
        cDOB.set(Calendar.DATE, dobDay);
        cDOB.set(Calendar.YEAR, dobYear);
        Date dob = cDOB.getTime();

        //Passport Expiration Date
        System.out.print("Passport Expiration Date (Year): ");
        int exYear = input.nextInt();
        System.out.print("Passport Expiration Date (Month, in numerical format): ");
        int exMonth = input.nextInt();
        System.out.print("Passport Expiration Date (Day): ");
        int exDay = input.nextInt();

        Calendar cPassEx = Calendar.getInstance();
        cPassEx.set(Calendar.MONTH, exMonth - 1);
        cPassEx.set(Calendar.DATE, exDay);
        cPassEx.set(Calendar.YEAR, exYear);
        Date passportExpire = cPassEx.getTime();

        //Passport Issue Date
        System.out.print("Passport Issue Date (Year): ");
        int issueYear = input.nextInt();
        System.out.print("Passport Issue Date (Month, in numerical format): ");
        int issueMonth = input.nextInt();
        System.out.print("Passport Issue Date (Day): ");
        int issueDay = input.nextInt();

        Calendar cPassIssue = Calendar.getInstance();
        cPassIssue.set(Calendar.MONTH, issueMonth - 1);
        cPassIssue.set(Calendar.DATE, issueDay);
        cPassIssue.set(Calendar.YEAR, issueYear);
        Date passportIssueDate = cPassIssue.getTime();

        //Integers
        System.out.print("Miles Flown: ");
        int milesFlown = input.nextInt();

        //Generate a Booking Number
        for (int i = 0; i < 6; i++) {
            Random r = new Random();
            char letter = (char) ('a' + r.nextInt(26));
            String transfer = String.valueOf(letter);
            transfer = transfer.toUpperCase();
            bookingNumber += transfer;
        }

        //Generate a seat number
        Random rRow = new Random();
        char row = (char) ('a' + rRow.nextInt(6));
        String capRow = String.valueOf(row);
        capRow = capRow.toUpperCase();
        int seatNum = (int)(Math.random() * 100);
        String seatNumString = Integer.toString(seatNum);
        seatNumber += capRow + seatNumString;

        AirlinePassenger passenger = new AirlinePassenger(title, firstName, lastName, dob, 
            mobileNumber, frequentFlyerNumber, nationality, passportNumber, passportCountry,
            passportExpire, passportIssueDate, milesFlown);
        System.out.println(passenger);

        Booking bookPassenger = new Booking(passenger, flightNumber, seatNumber, bookingDateTime, bookingNumber);
        System.out.println(bookPassenger);
    }
}