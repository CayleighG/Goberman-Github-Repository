//**************************************************
//AirlinePassenger.java
//3/23/23
//A Java class that represents an airline passenger; part 1 of 2
//**************************************************

import java.util.Date;

public class AirlinePassenger {
    //Private Data Fields
    private String title;
    private String firstName;
    private String lastName;
    private String mobileNumber;
    private String frequentFlyerNumber;
    private String nationality;
    private String passportNumber;
    private String passportCountry;

    private Date dob;
    private Date passportExpire;
    private Date passportIssueDate;

    private int milesFlown;

    //Constructors
    public AirlinePassenger() {
    }

    public AirlinePassenger(String title, String firstName, String lastName, Date dob,
            String mobileNumber, String frequentFlyerNumber, String nationality,
            String passportNumber, String passportCountry,
            Date passportExpire, Date passportIssueDate, int milesFlown) {
        this.title = title;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = dob;

        this.mobileNumber = mobileNumber;
        this.frequentFlyerNumber = frequentFlyerNumber;
        this.nationality = nationality;
        this.passportNumber = passportNumber;
        this.passportCountry = passportCountry;

        this.passportExpire = passportExpire;
        this.passportIssueDate = passportIssueDate;

        this.milesFlown = milesFlown;
    }

    /*
     * public AirlinePassenger(String mobileNumber, String frequentFlyerNumber, String nationality, String passportNumber,
            String passportCountry, Date passportExpire, Date passportIssueDate, int milesFlown) {
        this.mobileNumber = mobileNumber;
        this.frequentFlyerNumber = frequentFlyerNumber;
        this.nationality = nationality;
        this.passportNumber = passportNumber;
        this.passportCountry = passportCountry;
        this.passportExpire = passportExpire;
        this.passportIssueDate = passportIssueDate;
        this.milesFlown = milesFlown;
    }
     */

    //Getters and Setters
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getFrequentFlyerNumber() {
        return frequentFlyerNumber;
    }

    public void setFrequentFlyerNumber(String frequentFlyerNumber) {
        this.frequentFlyerNumber = frequentFlyerNumber;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public String getPassportNumber() {
        return passportNumber;
    }

    public void setPassportNumber(String passportNumber) {
        this.passportNumber = passportNumber;
    }

    public String getPassportCountry() {
        return passportCountry;
    }

    public void setPassportCountry(String passportCountry) {
        this.passportCountry = passportCountry;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public Date getPassportExpire() {
        return passportExpire;
    }

    public void setPassportExpire(Date passportExpire) {
        this.passportExpire = passportExpire;
    }

    public Date getPassportIssueDate() {
        return passportIssueDate;
    }

    public void setPassportIssueDate(Date passportIssueDate) {
        this.passportIssueDate = passportIssueDate;
    }

    public int getMilesFlown() {
        return milesFlown;
    }

    public void setMilesFlown(int milesFlown) {
        this.milesFlown = milesFlown;
    }
    //Getters and Setters End


    //addMiles method
    void addMiles(int miles) {
        miles = milesFlown;
        miles++;
        milesFlown = miles;
    }

    //toString()
    //public String toString() {
    //    return "\nYour flight has been booked. Please review your information: " + 
    //    "\nName: " + firstName + " " + lastName +
    //    "\nDOB: " + dob + 
    //    "\nTitle of Flight: " + title;
    //}

    //The instructions tell us to add a constructor for title, firstName, lastName, and dob.
    //As such, they are the only ones that will be printed.
    //However, I wanted to keep this code to demonstrate that I know how to print the rest of them, if needed.
    //I would need to add constructors for the extra info to be printed, but that be simple. 
    //(right click --> Source Action --> Generate Constructors --> Select appropriate variables)
    
    public String toString() {
        return "\nYour flight has been booked. Please review your information: " +
        "\nName: " + firstName + " " + lastName + 
        "\nDate of Birth: " + dob + 
        "\nMobile Number: " + mobileNumber +
        "\nTitle of Flight: " + title +
        "\nFrequent Flyer Number: " + frequentFlyerNumber + 
        "\nMiles Flown: " + milesFlown + " miles" +
        "\nNationality: " + nationality +
        "\nPassport Number: " + passportNumber + 
        "\nPassport Issue Date: " + passportIssueDate +
        "\nPassport Expiration Date: " + passportExpire +
        "\nPassport Country: " + passportCountry;
    }
}