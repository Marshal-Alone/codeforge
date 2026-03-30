// Number Series + Conversions + Recursion
export const part2 = [
  // ===== NUMBER SERIES =====
  {
    id: 11, title: 'Fibonacci Series', category: 'number-series', difficulty: 'easy', type: 'coding', tags: ['Series', 'Loop'],
    description: 'Write a program to print Fibonacci series up to n terms.',
    examples: [
      { input: 'n = 5', output: '0 1 1 2 3' },
      { input: 'n = 1', output: '0' },
      { input: 'n = 0', output: '' },
      { input: 'n = 8', output: '0 1 1 2 3 5 8 13' },
      { input: 'n = 2', output: '0 1' }
    ],
    hints: ['Each Fibonacci number is sum of the two preceding numbers.', 'Maintain two variables to track previous two numbers.', 'Print the first number before calculating next sum.'],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        int n = 10;\n        int t1 = 0, t2 = 1;\n        // Your code here - print t1 and update values\n        System.out.println();\n    }\n}',
    solution: 'public class Main {\n    public static void main(String[] args) {\n        int n = 10, t1 = 0, t2 = 1;\n        for (int i = 1; i <= n; i++) {\n            System.out.print(t1 + " ");\n            int sum = t1 + t2;\n            t1 = t2;\n            t2 = sum;\n        }\n    }\n}'
  },
  {
    id: 12, title: 'Prime Numbers up to N', category: 'number-series', difficulty: 'easy', type: 'coding', tags: ['Prime', 'Loop'],
    description: 'Write a program to print all prime numbers up to n.',
    examples: [
      { input: 'n = 30', output: '2 3 5 7 11 13 17 19 23 29' },
      { input: 'n = 10', output: '2 3 5 7' },
      { input: 'n = 2', output: '2' },
      { input: 'n = 1', output: '' },
      { input: 'n = 20', output: '2 3 5 7 11 13 17 19' }
    ],
    hints: ['A prime number is divisible only by 1 and itself.', 'To check if number i is prime, test divisibility from 2 to sqrt(i) only.', 'If any divisor found, mark as not prime and break immediately.'],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        int n = 30;\n        for (int i = 2; i <= n; i++) {\n            boolean isPrime = true;\n            // Your code here - check if i is prime\n            if (isPrime) System.out.print(i + " ");\n        }\n    }\n}',
    solution: 'public class Main {\n    public static void main(String[] args) {\n        int n = 30;\n        for (int i = 2; i <= n; i++) {\n            boolean isPrime = true;\n            for (int j = 2; j <= Math.sqrt(i); j++) {\n                if (i % j == 0) {\n                    isPrime = false;\n                    break;\n                }\n            }\n            if (isPrime) System.out.print(i + " ");\n        }\n    }\n}'
  },
  {
    id: 13, title: 'Armstrong Numbers', category: 'number-series', difficulty: 'medium', type: 'coding', tags: ['Math', 'Digits'],
    description: 'Print Armstrong numbers between 1 and n. An Armstrong number is one where the sum of cubes of its digits equals the number itself (e.g., 153 = 1³+5³+3³).',
    examples: [
      { input: 'n = 500', output: '1 153 370 371 407' },
      { input: 'n = 150', output: '1' },
      { input: 'n = 1', output: '1' },
      { input: 'n = 155', output: '1 153' },
      { input: 'n = 400', output: '1 153 370 371' }
    ],
    hints: ['Extract each digit using modulo (%) operator and division.', 'Calculate cube of each digit (d*d*d) and sum them.', 'Compare sum with original number to check if Armstrong.'],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        int n = 500;\n        for (int i = 1; i <= n; i++) {\n            int sum = 0, temp = i;\n            // Your code here - extract digits and sum their cubes\n            if (sum == i) System.out.print(i + " ");\n        }\n    }\n}',
    solution: 'public class Main {\n    public static void main(String[] args) {\n        int n = 500;\n        for (int i = 1; i <= n; i++) {\n            int sum = 0, temp = i;\n            while (temp != 0) {\n                int digit = temp % 10;\n                sum += digit * digit * digit;\n                temp /= 10;\n            }\n            if (sum == i) System.out.print(i + " ");\n        }\n    }\n}'
  },
  {
    id: 14, title: 'Pattern Series (1, 12, 123...)', category: 'number-series', difficulty: 'easy', type: 'coding', tags: ['Pattern', 'Nested Loop'],
    description: 'Print the pattern: 1, 12, 123, 1234, ... up to n rows.',
    examples: [
      { input: 'n = 5', output: '1\n12\n123\n1234\n12345' },
      { input: 'n = 3', output: '1\n12\n123' },
      { input: 'n = 1', output: '1' },
      { input: 'n = 2', output: '1\n12' }
    ],
    hints: ['Use nested loops: outer for rows, inner for columns.', 'In row i, print numbers from 1 to i.', 'After each row completes, print newline using println().'],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        int n = 5;\n        for (int i = 1; i <= n; i++) {\n            // Your code here - inner loop from 1 to i\n            System.out.println();\n        }\n    }\n}',
    solution: 'public class Main {\n    public static void main(String[] args) {\n        int n = 5;\n        for (int i = 1; i <= n; i++) {\n            for (int j = 1; j <= i; j++) {\n                System.out.print(j);\n            }\n            System.out.println();\n        }\n    }\n}'
  },
  {
    id: 15, title: 'Harmonic Series Sum', category: 'number-series', difficulty: 'easy', type: 'coding', tags: ['Series', 'Math'],
    description: 'Print the sum of harmonic series: 1 + 1/2 + 1/3 + ... + 1/n.',
    examples: [
      { input: 'n = 5', output: 'Sum = 2.2833' },
      { input: 'n = 1', output: 'Sum = 1.0000' },
      { input: 'n = 2', output: 'Sum = 1.5000' },
      { input: 'n = 3', output: 'Sum = 1.8333' },
      { input: 'n = 10', output: 'Sum = 2.9290' }
    ],
    hints: ['Use double for sum to maintain decimal precision.', 'Use 1.0 / i instead of 1 / i to ensure floating-point division.', 'Use printf with %.4f format specifier to print 4 decimal places.'],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        int n = 5;\n        double sum = 0;\n        // Your code here - add 1.0 / i for each i from 1 to n\n        System.out.printf("Sum = %.4f%n", sum);\n    }\n}',
    solution: 'public class Main {\n    public static void main(String[] args) {\n        int n = 5;\n        double sum = 0;\n        for (int i = 1; i <= n; i++) {\n            sum += 1.0 / i;\n        }\n        System.out.printf("Sum = %.4f%n", sum);\n    }\n}'
  },
  {
    id: 40, title: 'Reverse a Number', category: 'number-series', difficulty: 'easy', type: 'coding', tags: ['Math', 'Digits'],
    description: 'Reverse the digits of a number.',
    examples: [
      { input: 'num = 1234', output: '4321' },
      { input: 'num = 100', output: '1' },
      { input: 'num = -123', output: '-321' },
      { input: 'num = 1000', output: '1' },
      { input: 'num = 5', output: '5' }
    ],
    hints: ['Extract last digit using modulo operator (% 10).', 'Build reversed number: rev = rev * 10 + last_digit.', 'Continuously divide num by 10 to remove last digit until num becomes 0.'],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        int num = 1234;\n        int reversed = 0;\n        // Your code here - extract digits and build reversed number\n        System.out.println("Reversed: " + reversed);\n    }\n}',
    solution: 'public class Main {\n    public static void main(String[] args) {\n        int num = 1234;\n        int reversed = 0;\n        while (num != 0) {\n            int lastDigit = num % 10;\n            reversed = reversed * 10 + lastDigit;\n            num /= 10;\n        }\n        System.out.println("Reversed: " + reversed);\n    }\n}'
  },
  {
    id: 41, title: 'Palindrome Number', category: 'number-series', difficulty: 'easy', type: 'coding', tags: ['Math', 'Palindrome'],
    description: 'Check whether a number is palindrome (reads same forward and backward).',
    examples: [
      { input: 'num = 121', output: 'true' },
      { input: 'num = 123', output: 'false' },
      { input: 'num = 1', output: 'true' },
      { input: 'num = 11', output: 'true' },
      { input: 'num = -121', output: 'false' }
    ],
    hints: ['Save original number before modifying it during reversal.', 'Reverse the number by extracting digits: rev = rev * 10 + (num % 10).', 'Compare reversed number with original to determine if palindrome.'],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        int num = 121;\n        int original = num;\n        int reversed = 0;\n        // Your code here - reverse the number\n        System.out.println(original == reversed ? "Palindrome" : "Not Palindrome");\n    }\n}',
    solution: 'public class Main {\n    public static void main(String[] args) {\n        int num = 121;\n        int original = num;\n        int reversed = 0;\n        while (num != 0) {\n            reversed = reversed * 10 + num % 10;\n            num /= 10;\n        }\n        System.out.println(original == reversed ? "Palindrome" : "Not Palindrome");\n    }\n}'
  },
  {
    id: 42, title: 'Prime Number Check', category: 'number-series', difficulty: 'easy', type: 'coding', tags: ['Prime', 'Math'],
    description: 'Check whether a given number is prime or not.',
    examples: [
      { input: 'num = 7', output: 'true' },
      { input: 'num = 1', output: 'false' },
      { input: 'num = 2', output: 'true' },
      { input: 'num = 4', output: 'false' },
      { input: 'num = 17', output: 'true' }
    ],
    hints: ['Prime must be greater than 1. Check this as base condition.', 'Check divisibility only from 2 to sqrt(num) for efficiency.', 'If any divisor found, mark as not prime and break immediately.'],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        int num = 7;\n        boolean isPrime = num > 1;\n        // Your code here - check divisibility from 2 to sqrt(num)\n        System.out.println(isPrime ? "Prime" : "Not Prime");\n    }\n}',
    solution: 'public class Main {\n    public static void main(String[] args) {\n        int num = 7;\n        boolean isPrime = num > 1;\n        for (int i = 2; i <= Math.sqrt(num); i++) {\n            if (num % i == 0) {\n                isPrime = false;\n                break;\n            }\n        }\n        System.out.println(isPrime ? "Prime" : "Not Prime");\n    }\n}'
  },
  {
    id: 43, title: 'Sum of Smallest & Largest Prime', category: 'number-series', difficulty: 'medium', type: 'coding', tags: ['Prime', 'Range'],
    description: 'Find all primes in a given range, then print sum of smallest and largest prime found.',
    examples: [
      { input: 'low = 10, high = 30', output: '40' },
      { input: 'low = 1, high = 10', output: '9' },
      { input: 'low = 2, high = 5', output: '7' },
      { input: 'low = 20, high = 40', output: '60' }
    ],
    hints: ['Create a helper function isPrime(n) to check if a number is prime.', 'Iterate through the range and track first and last prime found.', 'Sum the smallest and largest primes, then print the result.'],
    starterCode: 'public class Main {\n    static boolean isPrime(int n) {\n        if (n < 2) return false;\n        for (int i = 2; i <= Math.sqrt(n); i++)\n            if (n % i == 0) return false;\n        return true;\n    }\n    public static void main(String[] args) {\n        int low = 10, high = 30;\n        int smallest = -1, largest = -1;\n        // Your code here - find smallest & largest prime\n        System.out.println("Sum: " + (smallest + largest));\n    }\n}',
    solution: 'public class Main {\n    static boolean isPrime(int n) {\n        if (n < 2) return false;\n        for (int i = 2; i <= Math.sqrt(n); i++) {\n            if (n % i == 0) return false;\n        }\n        return true;\n    }\n    public static void main(String[] args) {\n        int low = 10, high = 30;\n        int smallest = -1, largest = -1;\n        for (int i = low; i <= high; i++) {\n            if (isPrime(i)) {\n                if (smallest == -1) smallest = i;\n                largest = i;\n            }\n        }\n        System.out.println("Sum: " + (smallest + largest));\n    }\n}'
  },
  {
    id: 44, title: 'Strong Number', category: 'number-series', difficulty: 'medium', type: 'coding', tags: ['Math', 'Factorial'],
    description: 'Check whether a number is a strong number (sum of factorial of its digits equals the number itself).',
    examples: [
      { input: 'num = 145', output: 'true' },
      { input: 'num = 1', output: 'true' },
      { input: 'num = 2', output: 'true' },
      { input: 'num = 10', output: 'false' },
      { input: 'num = 40585', output: 'true' }
    ],
    hints: ['Create a factorial helper function.', 'Extract each digit using modulo (% 10) and divide by 10.', 'Sum the factorial of all digits and compare with original number.'],
    starterCode: 'public class Main {\n    static int factorial(int n) {\n        int result = 1;\n        for (int i = 2; i <= n; i++) result *= i;\n        return result;\n    }\n    public static void main(String[] args) {\n        int num = 145;\n        int sum = 0, temp = num;\n        // Your code here - extract digits and sum their factorials\n        System.out.println(sum == num ? "true" : "false");\n    }\n}',
    solution: 'public class Main {\n    static int factorial(int n) {\n        int result = 1;\n        for (int i = 2; i <= n; i++) {\n            result *= i;\n        }\n        return result;\n    }\n    public static void main(String[] args) {\n        int num = 145;\n        int sum = 0, temp = num;\n        while (temp != 0) {\n            sum += factorial(temp % 10);\n            temp /= 10;\n        }\n        System.out.println(sum == num ? "true" : "false");\n    }\n}'
  },
  {
    id: 45, title: 'Automorphic Number', category: 'number-series', difficulty: 'medium', type: 'coding', tags: ['Math', 'Square'],
    description: 'Check whether a number is automorphic (its square ends with the number itself). Example: 5² = 25 (ends with 5).',
    examples: [
      { input: 'num = 25', output: 'true' },
      { input: 'num = 5', output: 'true' },
      { input: 'num = 6', output: 'true' },
      { input: 'num = 76', output: 'true' },
      { input: 'num = 10', output: 'false' }
    ],
    hints: ['Square the given number.', 'Find the number of digits in the original number.', 'Use modulo with 10^(digit_count) to extract last digits from square.'],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        int num = 25;\n        int square = num * num;\n        int digitCount = String.valueOf(num).length();\n        // Your code here - check if square ends with num\n        System.out.println(/*result*/ ? "true" : "false");\n    }\n}',
    solution: 'public class Main {\n    public static void main(String[] args) {\n        int num = 25;\n        int square = num * num;\n        int digitCount = String.valueOf(num).length();\n        int divisor = (int) Math.pow(10, digitCount);\n        boolean isAutomorphic = (square % divisor) == num;\n        System.out.println(isAutomorphic ? "true" : "false");\n    }\n}'
  },

  // ===== CONVERSIONS =====
  {
    id: 16, title: 'Decimal to Binary', category: 'conversions', difficulty: 'easy', type: 'coding', tags: ['Conversion', 'Binary'],
    description: 'Convert a decimal (base-10) number to binary (base-2) representation.',
    examples: [
      { input: 'num = 10', output: '1010' },
      { input: 'num = 0', output: '0' },
      { input: 'num = 1', output: '1' },
      { input: 'num = 255', output: '11111111' },
      { input: 'num = 16', output: '10000' }
    ],
    hints: ['Binary uses base-2: each digit represents power of 2.', 'Use Integer.toBinaryString() to convert decimal to binary string.', 'Example: 10 in decimal = (8+2) = 2³+2¹ = 1010 in binary.'],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        int num = 10;\n        // Your code here - convert num to binary\n        System.out.println("Binary: " + /* result */);\n    }\n}',
    solution: 'public class Main {\n    public static void main(String[] args) {\n        int num = 10;\n        String binary = Integer.toBinaryString(num);\n        System.out.println("Binary: " + binary);\n    }\n}'
  },
  {
    id: 18, title: 'Decimal to Hexadecimal', category: 'conversions', difficulty: 'easy', type: 'coding', tags: ['Conversion', 'Hex'],
    description: 'Convert a decimal (base-10) number to hexadecimal (base-16) representation.',
    examples: [
      { input: 'num = 255', output: 'ff' },
      { input: 'num = 0', output: '0' },
      { input: 'num = 16', output: '10' },
      { input: 'num = 256', output: '100' },
      { input: 'num = 4095', output: 'fff' }
    ],
    hints: ['Hexadecimal uses base-16: digits 0-9 and letters a-f (10-15).', 'Use Integer.toHexString() to convert decimal to hexadecimal string.', 'Example: 255 in decimal = (15×16+15) = ff in hexadecimal.'],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        int num = 255;\n        // Your code here - convert num to hexadecimal\n        System.out.println("Hex: " + /* result */);\n    }\n}',
    solution: 'public class Main {\n    public static void main(String[] args) {\n        int num = 255;\n        String hexadecimal = Integer.toHexString(num);\n        System.out.println("Hex: " + hexadecimal);\n    }\n}'
  },
  {
    id: 19, title: 'Fahrenheit to Celsius', category: 'conversions', difficulty: 'easy', type: 'coding', tags: ['Conversion', 'Temperature'],
    description: 'Convert Fahrenheit to Celsius using the formula: C = (F - 32) × 5/9',
    examples: [
      { input: 'fahrenheit = 100.0', output: '37.78' },
      { input: 'fahrenheit = 32.0', output: '0.00' },
      { input: 'fahrenheit = 212.0', output: '100.00' },
      { input: 'fahrenheit = 0.0', output: '-17.78' },
      { input: 'fahrenheit = 98.6', output: '37.00' }
    ],
    hints: ['Apply the formula: C = (F - 32) × 5/9 exactly as given.', 'Use double for both variables to maintain decimal precision.', 'Use printf with %.2f to display result with 2 decimal places.'],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        double fahrenheit = 100.0;\n        // Your code here - apply conversion formula\n        System.out.printf("%.2f%n", celsius);\n    }\n}',
    solution: 'public class Main {\n    public static void main(String[] args) {\n        double fahrenheit = 100.0;\n        double celsius = (fahrenheit - 32) * 5 / 9;\n        System.out.printf("%.2f%n", celsius);\n    }\n}'
  },
  {
    id: 20, title: 'String to Integer (Manual)', category: 'conversions', difficulty: 'medium', type: 'coding', tags: ['Conversion', 'String'],
    description: 'Convert a string to integer manually without using Integer.parseInt().',
    examples: [
      { input: '"123"', output: '123' },
      { input: '"0"', output: '0' },
      { input: '"999"', output: '999' },
      { input: '"1"', output: '1' },
      { input: '"54321"', output: '54321' }
    ],
    hints: ['For each character, subtract ASCII value of \'0\' to get digit (0-9).', 'Build number progressively: num = num * 10 + digit.', 'Process characters left to right to build the final number.'],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        String str = "123";\n        int number = 0;\n        // Your code here - convert each char to digit and build number\n        System.out.println("Integer: " + number);\n    }\n}',
    solution: 'public class Main {\n    public static void main(String[] args) {\n        String str = "123";\n        int number = 0;\n        for (char c : str.toCharArray()) {\n            int digit = c - \'0\';\n            number = number * 10 + digit;\n        }\n        System.out.println("Integer: " + number);\n    }\n}'
  },

  // ===== RECURSION =====
  {
    id: 46, title: 'Factorial Using Recursion', category: 'recursion', difficulty: 'easy', type: 'coding', tags: ['Recursion', 'Math'],
    description: 'Find factorial of a number using recursion.',
    examples: [
      { input: 'n = 5', output: '120' },
      { input: 'n = 0', output: '1' },
      { input: 'n = 1', output: '1' },
      { input: 'n = 6', output: '720' },
      { input: 'n = 10', output: '3628800' }
    ],
    hints: ['Base case: if n ≤ 1, return 1 (0! = 1! = 1).', 'Recursive case: n! = n × factorial(n-1).', 'Each recursive call reduces n by 1 until reaching base case.'],
    starterCode: 'public class Main {\n    static int factorial(int n) {\n        // Your code here - return base case or recursive case\n        // Base: if n <= 1 return 1\n        // Recursive: return n * factorial(n-1)\n    }\n    public static void main(String[] args) {\n        int n = 5;\n        System.out.println(n + "! = " + factorial(n));\n    }\n}',
    solution: 'public class Main {\n    static int factorial(int n) {\n        if (n <= 1) {\n            return 1;\n        }\n        return n * factorial(n - 1);\n    }\n    public static void main(String[] args) {\n        int n = 5;\n        System.out.println(n + "! = " + factorial(n));\n    }\n}'
  },
  {
    id: 47, title: 'Fibonacci Using Recursion', category: 'recursion', difficulty: 'easy', type: 'coding', tags: ['Recursion', 'Series'],
    description: 'Print Fibonacci series up to n terms using recursion.',
    examples: [
      { input: 'n = 5', output: '0 1 1 2 3' },
      { input: 'n = 1', output: '0' },
      { input: 'n = 8', output: '0 1 1 2 3 5 8 13' },
      { input: 'n = 3', output: '0 1 1' }
    ],
    hints: ['Base case: if n ≤ 1, return n itself (fib(0)=0, fib(1)=1).', 'Recursive case: fib(n) = fib(n-1) + fib(n-2).', 'Call fib(i) for i from 0 to n-1 to get all n Fibonacci numbers.'],
    starterCode: 'public class Main {\n    static int fib(int n) {\n        // Your code here - return base case or recursive case\n        // Base: if n <= 1 return n\n        // Recursive: return fib(n-1) + fib(n-2)\n    }\n    public static void main(String[] args) {\n        int n = 5;\n        for (int i = 0; i < n; i++) {\n            System.out.print(fib(i) + " ");\n        }\n    }\n}',
    solution: 'public class Main {\n    static int fib(int n) {\n        if (n <= 1) {\n            return n;\n        }\n        return fib(n - 1) + fib(n - 2);\n    }\n    public static void main(String[] args) {\n        int n = 5;\n        for (int i = 0; i < n; i++) {\n            System.out.print(fib(i) + " ");\n        }\n    }\n}'
  },
];