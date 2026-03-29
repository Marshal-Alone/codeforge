// Number Series + Conversions + Recursion
export const part2 = [
  // ===== NUMBER SERIES =====
  {
    id: 11, title: 'Fibonacci Series', category: 'number-series', difficulty: 'easy', type: 'coding', tags: ['Series', 'Loop'],
    description: 'Write a program to print Fibonacci series up to n terms.',
    examples: [
      { input: 'n = 5', output: '0 1 1 2 3' },
      { input: 'n = 1', output: '0' },
      { input: 'n = 0', output: '' }
    ],
    hints: ['Each number is sum of two preceding numbers.', 'Start with 0 and 1.'],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        int n = 10;\n        // Your code here\n    }\n}',
    solution: 'public class Main {\n    public static void main(String[] args) {\n        int n = 10, t1 = 0, t2 = 1;\n        for (int i = 1; i <= n; i++) {\n            System.out.print(t1 + " ");\n            int sum = t1 + t2; t1 = t2; t2 = sum;\n        }\n    }\n}'
  },
  {
    id: 12, title: 'Prime Numbers up to N', category: 'number-series', difficulty: 'easy', type: 'coding', tags: ['Prime', 'Loop'],
    description: 'Write a program to print all prime numbers up to n.',
    examples: [{ input: 'n = 30', output: '2 3 5 7 11 13 17 19 23 29' }],
    hints: ['A prime is divisible only by 1 and itself.'],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        int n = 30;\n        // Your code here\n    }\n}',
    solution: 'public class Main {\n    public static void main(String[] args) {\n        int n = 30;\n        for (int i = 2; i <= n; i++) {\n            boolean prime = true;\n            for (int j = 2; j <= Math.sqrt(i); j++) if (i % j == 0) { prime = false; break; }\n            if (prime) System.out.print(i + " ");\n        }\n    }\n}'
  },
  {
    id: 13, title: 'Armstrong Numbers', category: 'number-series', difficulty: 'medium', type: 'coding', tags: ['Math', 'Digits'],
    description: 'Print Armstrong numbers between 1 and n. An Armstrong number equals the sum of cubes of its digits.',
    examples: [
      { input: 'n = 500', output: '1 153 370 371 407' },
      { input: 'n = 150', output: '1 153' },
      { input: 'n = 1', output: '1' }
    ],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        int n = 500;\n        // Your code here\n    }\n}',
    solution: 'public class Main {\n    public static void main(String[] args) {\n        int n = 500;\n        for (int i = 1; i <= n; i++) {\n            int sum = 0, temp = i;\n            while (temp != 0) { int d = temp % 10; sum += d*d*d; temp /= 10; }\n            if (sum == i) System.out.print(i + " ");\n        }\n    }\n}'
  },
  {
    id: 14, title: 'Pattern Series (1, 12, 123...)', category: 'number-series', difficulty: 'easy', type: 'coding', tags: ['Pattern', 'Nested Loop'],
    description: 'Print the pattern: 1, 12, 123, 1234, ... up to n rows.',
    examples: [
      { input: 'n = 5', output: '1\n12\n123\n1234\n12345' },
      { input: 'n = 3', output: '1\n12\n123' }
    ],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        int n = 5;\n        // Your code here\n    }\n}',
    solution: 'public class Main {\n    public static void main(String[] args) {\n        int n = 5;\n        for (int i = 1; i <= n; i++) {\n            for (int j = 1; j <= i; j++) System.out.print(j);\n            System.out.println();\n        }\n    }\n}'
  },
  {
    id: 15, title: 'Harmonic Series Sum', category: 'number-series', difficulty: 'easy', type: 'coding', tags: ['Series', 'Math'],
    description: 'Print the sum of series 1 + 1/2 + 1/3 + ... + 1/n.',
    examples: [{ input: 'n = 5', output: 'Sum = 2.2833' }],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        int n = 5;\n        // Your code here\n    }\n}',
    solution: 'public class Main {\n    public static void main(String[] args) {\n        int n = 5;\n        double sum = 0;\n        for (int i = 1; i <= n; i++) sum += 1.0 / i;\n        System.out.printf("Sum = %.4f%n", sum);\n    }\n}'
  },
  {
    id: 40, title: 'Reverse a Number', category: 'number-series', difficulty: 'easy', type: 'coding', tags: ['Math', 'Digits'],
    description: 'Reverse the digits of a number.',
    examples: [
      { input: 'num = 1234', output: '4321' },
      { input: 'num = 100', output: '1' },
      { input: 'num = -123', output: '-321' }
    ],
    hints: ['Extract last digit with %10, build reversed number.'],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        int num = 1234;\n        // Your code here\n    }\n}',
    solution: 'public class Main {\n    public static void main(String[] args) {\n        int num = 1234, rev = 0;\n        while (num != 0) { rev = rev * 10 + num % 10; num /= 10; }\n        System.out.println("Reversed: " + rev);\n    }\n}'
  },
  {
    id: 41, title: 'Palindrome Number', category: 'number-series', difficulty: 'easy', type: 'coding', tags: ['Math', 'Palindrome'],
    description: 'Check whether a number is palindrome (reads same forward and backward).',
    examples: [
      { input: 'num = 121', output: 'true' },
      { input: 'num = 123', output: 'false' }
    ],
    hints: ['Reverse the number and compare with original.'],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        int num = 121;\n        // Your code here\n    }\n}',
    solution: 'public class Main {\n    public static void main(String[] args) {\n        int num = 121, original = num, rev = 0;\n        while (num != 0) { rev = rev * 10 + num % 10; num /= 10; }\n        System.out.println(original == rev ? "Palindrome" : "Not Palindrome");\n    }\n}'
  },
  {
    id: 42, title: 'Prime Number Check', category: 'number-series', difficulty: 'easy', type: 'coding', tags: ['Prime', 'Math'],
    description: 'Check whether a given number is prime or not.',
    examples: [
      { input: 'num = 7', output: 'true' },
      { input: 'num = 1', output: 'false' }
    ],
    hints: ['Check divisibility from 2 to sqrt(n).'],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        int num = 7;\n        // Your code here\n    }\n}',
    solution: 'public class Main {\n    public static void main(String[] args) {\n        int num = 7;\n        boolean prime = num > 1;\n        for (int i = 2; i <= Math.sqrt(num); i++) if (num % i == 0) { prime = false; break; }\n        System.out.println(prime ? "Prime" : "Not Prime");\n    }\n}'
  },
  {
    id: 43, title: 'Sum of Smallest & Largest Prime', category: 'number-series', difficulty: 'medium', type: 'coding', tags: ['Prime', 'Range'],
    description: 'Find all primes in a range, then print sum of smallest and largest prime.',
    examples: [{ input: 'Range: 10 to 30', output: 'Primes: 11,13,17,19,23,29 → Sum = 11+29 = 40' }],
    hints: ['Find all primes in range, track first and last.'],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        int low = 10, high = 30;\n        // Your code here\n    }\n}',
    solution: 'public class Main {\n    static boolean isPrime(int n) {\n        if (n < 2) return false;\n        for (int i = 2; i <= Math.sqrt(n); i++) if (n % i == 0) return false;\n        return true;\n    }\n    public static void main(String[] args) {\n        int low = 10, high = 30, smallest = -1, largest = -1;\n        for (int i = low; i <= high; i++) {\n            if (isPrime(i)) {\n                if (smallest == -1) smallest = i;\n                largest = i;\n            }\n        }\n        System.out.println("Smallest: " + smallest + ", Largest: " + largest);\n        System.out.println("Sum: " + (smallest + largest));\n    }\n}'
  },
  {
    id: 44, title: 'Strong Number', category: 'number-series', difficulty: 'medium', type: 'coding', tags: ['Math', 'Factorial'],
    description: 'Check whether a number is a strong number (sum of factorial of digits equals the number).',
    examples: [{ input: '145', output: 'Strong (1!+4!+5! = 1+24+120 = 145)' }],
    hints: ['Extract each digit, find its factorial, sum them.'],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        int num = 145;\n        // Your code here\n    }\n}',
    solution: 'public class Main {\n    static int factorial(int n) { int f = 1; for (int i = 2; i <= n; i++) f *= i; return f; }\n    public static void main(String[] args) {\n        int num = 145, sum = 0, temp = num;\n        while (temp != 0) { sum += factorial(temp % 10); temp /= 10; }\n        System.out.println(sum == num ? "Strong Number" : "Not a Strong Number");\n    }\n}'
  },
  {
    id: 45, title: 'Automorphic Number', category: 'number-series', difficulty: 'medium', type: 'coding', tags: ['Math', 'Square'],
    description: 'Check whether a number is automorphic (its square ends with the number itself).',
    examples: [{ input: '25', output: 'Automorphic (25² = 625, ends with 25)' }],
    hints: ['Square the number, check if it ends with original using modulo.'],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        int num = 25;\n        // Your code here\n    }\n}',
    solution: 'public class Main {\n    public static void main(String[] args) {\n        int num = 25;\n        int sq = num * num;\n        int digits = String.valueOf(num).length();\n        int mod = (int) Math.pow(10, digits);\n        System.out.println(sq % mod == num ? "Automorphic" : "Not Automorphic");\n    }\n}'
  },

  // ===== CONVERSIONS =====
  {
    id: 16, title: 'Decimal to Binary', category: 'conversions', difficulty: 'easy', type: 'coding', tags: ['Conversion', 'Binary'],
    description: 'Convert a decimal number to binary.',
    examples: [
      { input: 'num = 10', output: '1010' },
      { input: 'num = 0', output: '0' }
    ],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        int num = 10;\n        // Your code here\n    }\n}',
    solution: 'public class Main {\n    public static void main(String[] args) {\n        int num = 10;\n        System.out.println("Binary: " + Integer.toBinaryString(num));\n    }\n}'
  },
  {
    id: 18, title: 'Decimal to Hexadecimal', category: 'conversions', difficulty: 'easy', type: 'coding', tags: ['Conversion', 'Hex'],
    description: 'Convert a decimal number to hexadecimal.',
    examples: [{ input: 'num = 255', output: 'ff' }],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        int num = 255;\n        // Your code here\n    }\n}',
    solution: 'public class Main {\n    public static void main(String[] args) {\n        int num = 255;\n        System.out.println("Hex: " + Integer.toHexString(num));\n    }\n}'
  },
  {
    id: 19, title: 'Fahrenheit to Celsius', category: 'conversions', difficulty: 'easy', type: 'coding', tags: ['Conversion', 'Temperature'],
    description: 'Convert Fahrenheit to Celsius. Formula: C = (F - 32) × 5/9',
    examples: [{ input: 'fahrenheit = 100.0', output: '37.78°C' }],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        double f = 100.0;\n        // Your code here\n    }\n}',
    solution: 'public class Main {\n    public static void main(String[] args) {\n        double f = 100.0;\n        double c = (f - 32) * 5 / 9;\n        System.out.printf("%.2f°F = %.2f°C%n", f, c);\n    }\n}'
  },
  {
    id: 20, title: 'String to Integer (Manual)', category: 'conversions', difficulty: 'medium', type: 'coding', tags: ['Conversion', 'String'],
    description: 'Convert a string to integer without using Integer.parseInt().',
    examples: [{ input: '"123"', output: '123' }],
    hints: ['Process each char: num = num * 10 + (char - \'0\')'],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        String str = "123";\n        // Your code here\n    }\n}',
    solution: 'public class Main {\n    public static void main(String[] args) {\n        String str = "123";\n        int num = 0;\n        for (char c : str.toCharArray()) num = num * 10 + (c - \'0\');\n        System.out.println("Integer: " + num);\n    }\n}'
  },

  // ===== RECURSION =====
  {
    id: 46, title: 'Factorial Using Recursion', category: 'recursion', difficulty: 'easy', type: 'coding', tags: ['Recursion', 'Math'],
    description: 'Find factorial of a number using recursion.',
    examples: [
      { input: 'n = 5', output: '120' },
      { input: 'n = 0', output: '1' }
    ],
    hints: ['Base case: 0! = 1. Recursive: n! = n × (n-1)!'],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        int n = 5;\n        // Your code here\n    }\n}',
    solution: 'public class Main {\n    static int factorial(int n) { return n <= 1 ? 1 : n * factorial(n - 1); }\n    public static void main(String[] args) {\n        int n = 5;\n        System.out.println(n + "! = " + factorial(n));\n    }\n}'
  },
  {
    id: 47, title: 'Fibonacci Using Recursion', category: 'recursion', difficulty: 'easy', type: 'coding', tags: ['Recursion', 'Series'],
    description: 'Print Fibonacci series up to n terms using recursion.',
    examples: [{ input: 'n = 5', output: '0 1 1 2 3' }],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        int n = 5;\n        // Your code here\n    }\n}',
    solution: 'public class Main {\n    static int fib(int n) { return n <= 1 ? n : fib(n-1) + fib(n-2); }\n    public static void main(String[] args) {\n        int n = 5;\n        for (int i = 0; i < n; i++) System.out.print(fib(i) + " ");\n    }\n}'
  },
];