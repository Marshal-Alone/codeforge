// Sorting + DSA + OOP + Advanced Coding
export const part3 = [
  // ===== SORTING =====
  {
    id: 21, title: 'Bubble Sort', category: 'sorting', difficulty: 'easy', type: 'coding', tags: ['Sorting', 'O(n²)'],
    description: 'Implement bubble sort. Repeatedly swap adjacent elements if in wrong order.',
    examples: [
      { input: 'arr = {64, 34, 25, 12}', output: '[12, 25, 34, 64]' },
      { input: 'arr = {1}', output: '[1]' },
      { input: 'arr = {5, 2, 8, 1, 9}', output: '[1, 2, 5, 8, 9]' }
    ],
    hints: ['Nested loops.', 'Each pass bubbles largest to the end.'],
    starterCode: 'import java.util.Arrays;\npublic class Main {\n    public static void main(String[] args) {\n        int[] arr = {64, 34, 25, 12, 22, 11, 90};\n        // Implement bubble sort\n        System.out.println(Arrays.toString(arr));\n    }\n}',
    solution: 'import java.util.Arrays;\npublic class Main {\n    public static void main(String[] args) {\n        int[] arr = {64, 34, 25, 12, 22, 11, 90};\n        int n = arr.length;\n        for (int i = 0; i < n-1; i++)\n            for (int j = 0; j < n-i-1; j++)\n                if (arr[j] > arr[j+1]) { int t = arr[j]; arr[j] = arr[j+1]; arr[j+1] = t; }\n        System.out.println("Sorted: " + Arrays.toString(arr));\n    }\n}'
  },
  {
    id: 22, title: 'Insertion Sort', category: 'sorting', difficulty: 'easy', type: 'coding', tags: ['Sorting', 'O(n²)'],
    description: 'Implement insertion sort. Build sorted array one item at a time.',
    examples: [
      { input: 'arr = {12, 11, 13, 5}', output: '[5, 11, 12, 13]' },
      { input: 'arr = {1}', output: '[1]' }
    ],
    starterCode: 'import java.util.Arrays;\npublic class Main {\n    public static void main(String[] args) {\n        int[] arr = {12, 11, 13, 5, 6};\n        // Implement insertion sort\n        System.out.println(Arrays.toString(arr));\n    }\n}',
    solution: 'import java.util.Arrays;\npublic class Main {\n    public static void main(String[] args) {\n        int[] arr = {12, 11, 13, 5, 6};\n        for (int i = 1; i < arr.length; i++) {\n            int key = arr[i], j = i - 1;\n            while (j >= 0 && arr[j] > key) { arr[j+1] = arr[j]; j--; }\n            arr[j+1] = key;\n        }\n        System.out.println("Sorted: " + Arrays.toString(arr));\n    }\n}'
  },
  {
    id: 23, title: 'Selection Sort', category: 'sorting', difficulty: 'easy', type: 'coding', tags: ['Sorting', 'O(n²)'],
    description: 'Implement selection sort. Find minimum and place at beginning each pass.',
    examples: [
      { input: 'arr = {64, 25, 12, 22}', output: '[12, 22, 25, 64]' },
      { input: 'arr = {1}', output: '[1]' }
    ],
    starterCode: 'import java.util.Arrays;\npublic class Main {\n    public static void main(String[] args) {\n        int[] arr = {64, 25, 12, 22, 11};\n        // Implement selection sort\n        System.out.println(Arrays.toString(arr));\n    }\n}',
    solution: 'import java.util.Arrays;\npublic class Main {\n    public static void main(String[] args) {\n        int[] arr = {64, 25, 12, 22, 11};\n        int n = arr.length;\n        for (int i = 0; i < n-1; i++) {\n            int min = i;\n            for (int j = i+1; j < n; j++) if (arr[j] < arr[min]) min = j;\n            int t = arr[min]; arr[min] = arr[i]; arr[i] = t;\n        }\n        System.out.println("Sorted: " + Arrays.toString(arr));\n    }\n}'
  },
  {
    id: 24, title: 'Quick Sort', category: 'sorting', difficulty: 'hard', type: 'coding', tags: ['Sorting', 'Divide&Conquer', 'Recursion'],
    description: 'Implement quick sort. Pick pivot, partition array around it.',
    examples: [{ input: '{10, 7, 8, 9, 1, 5}', output: '[1, 5, 7, 8, 9, 10]' }],
    hints: ['Choose last element as pivot.', 'Partition: < pivot go left, > pivot go right.', 'Recursively sort halves.'],
    starterCode: 'import java.util.Arrays;\npublic class Main {\n    public static void main(String[] args) {\n        int[] arr = {10, 7, 8, 9, 1, 5};\n        // Implement quick sort\n        System.out.println(Arrays.toString(arr));\n    }\n}',
    solution: 'import java.util.Arrays;\npublic class Main {\n    static int partition(int[] a, int lo, int hi) {\n        int pivot = a[hi], i = lo - 1;\n        for (int j = lo; j < hi; j++)\n            if (a[j] < pivot) { i++; int t = a[i]; a[i] = a[j]; a[j] = t; }\n        int t = a[i+1]; a[i+1] = a[hi]; a[hi] = t;\n        return i + 1;\n    }\n    static void quickSort(int[] a, int lo, int hi) {\n        if (lo < hi) { int p = partition(a, lo, hi); quickSort(a, lo, p-1); quickSort(a, p+1, hi); }\n    }\n    public static void main(String[] args) {\n        int[] arr = {10, 7, 8, 9, 1, 5};\n        quickSort(arr, 0, arr.length-1);\n        System.out.println("Sorted: " + Arrays.toString(arr));\n    }\n}'
  },
  {
    id: 25, title: 'Merge Sort', category: 'sorting', difficulty: 'hard', type: 'coding', tags: ['Sorting', 'Divide&Conquer', 'Recursion'],
    description: 'Implement merge sort. Divide into halves, sort each, merge back.',
    examples: [{ input: '{12, 11, 13, 5, 6, 7}', output: '[5, 6, 7, 11, 12, 13]' }],
    starterCode: 'import java.util.Arrays;\npublic class Main {\n    public static void main(String[] args) {\n        int[] arr = {12, 11, 13, 5, 6, 7};\n        // Implement merge sort\n        System.out.println(Arrays.toString(arr));\n    }\n}',
    solution: 'import java.util.Arrays;\npublic class Main {\n    static void merge(int[] a, int l, int m, int r) {\n        int[] L = Arrays.copyOfRange(a, l, m+1), R = Arrays.copyOfRange(a, m+1, r+1);\n        int i = 0, j = 0, k = l;\n        while (i < L.length && j < R.length) a[k++] = L[i] <= R[j] ? L[i++] : R[j++];\n        while (i < L.length) a[k++] = L[i++];\n        while (j < R.length) a[k++] = R[j++];\n    }\n    static void mergeSort(int[] a, int l, int r) {\n        if (l < r) { int m = (l+r)/2; mergeSort(a, l, m); mergeSort(a, m+1, r); merge(a, l, m, r); }\n    }\n    public static void main(String[] args) {\n        int[] arr = {12, 11, 13, 5, 6, 7};\n        mergeSort(arr, 0, arr.length-1);\n        System.out.println("Sorted: " + Arrays.toString(arr));\n    }\n}'
  },

  // ===== ADVANCED CODING =====
  {
    id: 26, title: 'Tower of Hanoi', category: 'advanced', difficulty: 'hard', type: 'coding', tags: ['Recursion', 'Classic'],
    description: 'Solve Towers of Hanoi with n disks. Move all from rod A to C using B as auxiliary.',
    examples: [{ input: 'n = 3', output: 'Move disk 1 from A to C\\nMove disk 2 from A to B\\n...' }],
    hints: ['Move n-1 to auxiliary, move nth to target, move n-1 from auxiliary to target.'],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        int n = 3;\n        // Your code here\n    }\n}',
    solution: 'public class Main {\n    static void hanoi(int n, char from, char to, char aux) {\n        if (n == 1) { System.out.println("Move disk 1 from " + from + " to " + to); return; }\n        hanoi(n-1, from, aux, to);\n        System.out.println("Move disk " + n + " from " + from + " to " + to);\n        hanoi(n-1, aux, to, from);\n    }\n    public static void main(String[] args) { hanoi(3, \'A\', \'C\', \'B\'); }\n}'
  },
  {
    id: 27, title: 'Longest Common Subsequence', category: 'advanced', difficulty: 'hard', type: 'coding', tags: ['DP', 'String', 'Recursion'],
    description: 'Find the length of the Longest Common Subsequence (LCS) in two strings.',
    examples: [
      { input: 's1 = "AGGTAB", s2 = "GXTXAYB"', output: '4' }
    ],
    // FIX: starterCode and solution were implementing String Permutations, not LCS.
    // Replaced both with a correct DP-based LCS implementation.
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        String s1 = "AGGTAB", s2 = "GXTXAYB";\n        // Your code here\n    }\n}',
    solution: 'public class Main {\n    public static void main(String[] args) {\n        String s1 = "AGGTAB", s2 = "GXTXAYB";\n        int m = s1.length(), n = s2.length();\n        int[][] dp = new int[m+1][n+1];\n        for (int i = 1; i <= m; i++)\n            for (int j = 1; j <= n; j++)\n                if (s1.charAt(i-1) == s2.charAt(j-1)) dp[i][j] = dp[i-1][j-1] + 1;\n                else dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);\n        System.out.println("LCS Length: " + dp[m][n]);\n    }\n}'
  },

  // ===== DSA =====
  {
    id: 29, title: 'Binary Tree Traversals', category: 'dsa', difficulty: 'medium', type: 'coding', tags: ['Tree', 'Recursion', 'Traversal'],
    description: 'Implement InOrder, PreOrder, and PostOrder traversal of a Binary Tree.',
    examples: [{ input: 'Tree: 1->(2,3), 2->(4,5)', output: 'InOrder: 4 2 5 1 3\\nPreOrder: 1 2 4 5 3\\nPostOrder: 4 5 2 3 1' }],
    hints: ['InOrder: Left,Root,Right', 'PreOrder: Root,Left,Right', 'PostOrder: Left,Right,Root'],
    starterCode: 'public class Main {\n    static class Node {\n        int val; Node left, right;\n        Node(int v) { val = v; }\n    }\n    public static void main(String[] args) {\n        Node root = new Node(1);\n        root.left = new Node(2); root.right = new Node(3);\n        root.left.left = new Node(4); root.left.right = new Node(5);\n        // Implement traversals\n    }\n}',
    solution: 'public class Main {\n    static class Node { int val; Node left, right; Node(int v) { val = v; } }\n    static void inorder(Node n) { if (n != null) { inorder(n.left); System.out.print(n.val+" "); inorder(n.right); } }\n    static void preorder(Node n) { if (n != null) { System.out.print(n.val+" "); preorder(n.left); preorder(n.right); } }\n    static void postorder(Node n) { if (n != null) { postorder(n.left); postorder(n.right); System.out.print(n.val+" "); } }\n    public static void main(String[] args) {\n        Node root = new Node(1);\n        root.left = new Node(2); root.right = new Node(3);\n        root.left.left = new Node(4); root.left.right = new Node(5);\n        System.out.print("InOrder: "); inorder(root);\n        System.out.print("\\nPreOrder: "); preorder(root);\n        System.out.print("\\nPostOrder: "); postorder(root);\n    }\n}'
  },
  {
    id: 30, title: 'Heap Sort', category: 'dsa', difficulty: 'hard', type: 'coding', tags: ['Sorting', 'Heap', 'Tree'],
    description: 'Implement heap sort using a max-heap.',
    examples: [{ input: '{12, 11, 13, 5, 6, 7}', output: '[5, 6, 7, 11, 12, 13]' }],
    starterCode: 'import java.util.Arrays;\npublic class Main {\n    public static void main(String[] args) {\n        int[] arr = {12, 11, 13, 5, 6, 7};\n        // Implement heap sort\n        System.out.println(Arrays.toString(arr));\n    }\n}',
    solution: 'import java.util.Arrays;\npublic class Main {\n    static void heapify(int[] a, int n, int i) {\n        int max = i, l = 2*i+1, r = 2*i+2;\n        if (l < n && a[l] > a[max]) max = l;\n        if (r < n && a[r] > a[max]) max = r;\n        if (max != i) { int t = a[i]; a[i] = a[max]; a[max] = t; heapify(a, n, max); }\n    }\n    public static void main(String[] args) {\n        int[] arr = {12, 11, 13, 5, 6, 7};\n        int n = arr.length;\n        for (int i = n/2-1; i >= 0; i--) heapify(arr, n, i);\n        for (int i = n-1; i > 0; i--) { int t = arr[0]; arr[0] = arr[i]; arr[i] = t; heapify(arr, i, 0); }\n        System.out.println("Sorted: " + Arrays.toString(arr));\n    }\n}'
  },
  {
    id: 48, title: 'BFS (Breadth-First Search)', category: 'dsa', difficulty: 'medium', type: 'coding', tags: ['Graph', 'Queue', 'BFS'],
    description: 'Implement BFS traversal of a graph using a queue.',
    examples: [{ input: 'Graph: 0->[1,2], 1->[2], 2->[0,3], 3->[3]', output: 'BFS from 2: 2 0 3 1' }],
    hints: ['Use a queue. Enqueue start, dequeue and visit neighbors.', 'Track visited nodes to avoid cycles.'],
    starterCode: 'import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        List<List<Integer>> graph = new ArrayList<>();\n        for (int i = 0; i < 4; i++) graph.add(new ArrayList<>());\n        graph.get(0).addAll(Arrays.asList(1, 2));\n        graph.get(1).add(2);\n        graph.get(2).addAll(Arrays.asList(0, 3));\n        graph.get(3).add(3);\n        // Implement BFS from node 2\n    }\n}',
    solution: 'import java.util.*;\npublic class Main {\n    static void bfs(List<List<Integer>> g, int start) {\n        boolean[] visited = new boolean[g.size()];\n        Queue<Integer> q = new LinkedList<>();\n        visited[start] = true; q.add(start);\n        while (!q.isEmpty()) {\n            int node = q.poll();\n            System.out.print(node + " ");\n            for (int n : g.get(node)) if (!visited[n]) { visited[n] = true; q.add(n); }\n        }\n    }\n    public static void main(String[] args) {\n        List<List<Integer>> g = new ArrayList<>();\n        for (int i = 0; i < 4; i++) g.add(new ArrayList<>());\n        g.get(0).addAll(Arrays.asList(1, 2));\n        g.get(1).add(2);\n        g.get(2).addAll(Arrays.asList(0, 3));\n        g.get(3).add(3);\n        System.out.print("BFS from 2: "); bfs(g, 2);\n    }\n}'
  },
  {
    id: 49, title: 'DFS (Depth-First Search)', category: 'dsa', difficulty: 'medium', type: 'coding', tags: ['Graph', 'Recursion', 'DFS'],
    description: 'Implement DFS traversal of a graph using recursion.',
    examples: [{ input: 'Graph: 0->[1,2], 1->[2], 2->[0,3], 3->[3]', output: 'DFS from 2: 2 0 1 3' }],
    hints: ['Use recursion + visited set.', 'Visit node, then recurse for unvisited neighbors.'],
    starterCode: 'import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        List<List<Integer>> graph = new ArrayList<>();\n        for (int i = 0; i < 4; i++) graph.add(new ArrayList<>());\n        graph.get(0).addAll(Arrays.asList(1, 2));\n        graph.get(1).add(2);\n        graph.get(2).addAll(Arrays.asList(0, 3));\n        graph.get(3).add(3);\n        // Implement DFS from node 2\n    }\n}',
    solution: 'import java.util.*;\npublic class Main {\n    static void dfs(List<List<Integer>> g, int node, boolean[] visited) {\n        visited[node] = true;\n        System.out.print(node + " ");\n        for (int n : g.get(node)) if (!visited[n]) dfs(g, n, visited);\n    }\n    public static void main(String[] args) {\n        List<List<Integer>> g = new ArrayList<>();\n        for (int i = 0; i < 4; i++) g.add(new ArrayList<>());\n        g.get(0).addAll(Arrays.asList(1, 2));\n        g.get(1).add(2);\n        g.get(2).addAll(Arrays.asList(0, 3));\n        g.get(3).add(3);\n        System.out.print("DFS from 2: "); dfs(g, 2, new boolean[4]);\n    }\n}'
  },
  {
    id: 50, title: 'Dijkstra\'s Shortest Path', category: 'dsa', difficulty: 'hard', type: 'coding', tags: ['Graph', 'Greedy', 'Shortest Path'],
    description: 'Implement Dijkstra\'s algorithm to find shortest paths from a source vertex.',
    examples: [{ input: 'Weighted graph, source = 0', output: 'Vertex 0 → Distance 0\\nVertex 1 → Distance 4\\n...' }],
    hints: ['Use a priority queue (min-heap).', 'Relax edges: if dist[u]+w < dist[v], update dist[v].'],
    starterCode: 'import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        int V = 5;\n        // Adjacency list: [node, weight]\n        // Implement Dijkstra from source 0\n    }\n}',
    solution: 'import java.util.*;\npublic class Main {\n    static void dijkstra(int[][] graph, int src) {\n        int V = graph.length;\n        int[] dist = new int[V]; boolean[] visited = new boolean[V];\n        Arrays.fill(dist, Integer.MAX_VALUE); dist[src] = 0;\n        for (int i = 0; i < V - 1; i++) {\n            int u = -1;\n            for (int v = 0; v < V; v++) if (!visited[v] && (u == -1 || dist[v] < dist[u])) u = v;\n            visited[u] = true;\n            for (int v = 0; v < V; v++)\n                if (graph[u][v] != 0 && !visited[v] && dist[u] + graph[u][v] < dist[v])\n                    dist[v] = dist[u] + graph[u][v];\n        }\n        for (int i = 0; i < V; i++) System.out.println("Vertex " + i + " -> Distance " + dist[i]);\n    }\n    public static void main(String[] args) {\n        int[][] graph = {{0,4,0,0,0},{4,0,8,0,0},{0,8,0,7,0},{0,0,7,0,9},{0,0,0,9,0}};\n        dijkstra(graph, 0);\n    }\n}'
  },

  // ===== OOP =====
  {
    id: 31, title: 'Encapsulation', category: 'oop', difficulty: 'easy', type: 'coding', tags: ['OOP', 'Encapsulation'],
    description: 'Demonstrate encapsulation using private variables with public getter/setter methods.',
    hints: ['Make fields private. Provide public getName()/setName() methods.'],
    starterCode: 'public class Main {\n    // Create Employee with private name field\n    // Add getter and setter\n    public static void main(String[] args) {\n        // Create employee and set name\n    }\n}',
    solution: 'public class Main {\n    private String name;\n    public String getName() { return name; }\n    public void setName(String n) { name = n; }\n    public static void main(String[] args) {\n        Main emp = new Main();\n        emp.setName("John Doe");\n        System.out.println("Name: " + emp.getName());\n    }\n}'
  },
  {
    id: 32, title: 'Polymorphism', category: 'oop', difficulty: 'medium', type: 'coding', tags: ['OOP', 'Polymorphism', 'Inheritance'],
    description: 'Implement polymorphism: parent Animal class with child classes overriding animalSound().',
    hints: ['Override parent method in child classes.', 'Use parent reference to hold child objects.'],
    starterCode: '// Create Animal class with animalSound()\n// Create Pig and Dog extending Animal\npublic class Main {\n    public static void main(String[] args) {\n        // Demonstrate polymorphism\n    }\n}',
    solution: 'class Animal { void sound() { System.out.println("Animal sound"); } }\nclass Pig extends Animal { void sound() { System.out.println("Pig: wee wee"); } }\nclass Dog extends Animal { void sound() { System.out.println("Dog: bow wow"); } }\npublic class Main {\n    public static void main(String[] args) {\n        Animal a1 = new Animal(), a2 = new Pig(), a3 = new Dog();\n        a1.sound(); a2.sound(); a3.sound();\n    }\n}'
  },
  {
    id: 33, title: 'Interface Implementation', category: 'oop', difficulty: 'medium', type: 'coding', tags: ['OOP', 'Interface', 'Abstraction'],
    description: 'Create an Animal interface with eat() and sound() methods, implement in a Cat class.',
    hints: ['Use `implements` keyword. All interface methods must be implemented.'],
    starterCode: '// Create Animal interface with eat() and sound()\n// Implement in Cat class\npublic class Main {\n    public static void main(String[] args) {\n        // Create Cat and call methods\n    }\n}',
    solution: 'interface Animal { void eat(); void sound(); }\nclass Cat implements Animal {\n    public void eat() { System.out.println("Cat eats"); }\n    public void sound() { System.out.println("Cat meows"); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Cat c = new Cat(); c.eat(); c.sound();\n    }\n}'
  },
  {
    id: 34, title: 'Inheritance — Bicycle & MountainBike', category: 'oop', difficulty: 'medium', type: 'coding', tags: ['OOP', 'Inheritance'],
    description: 'Demonstrate inheritance: Bicycle class and MountainBike subclass with seat height.',
    starterCode: '// Create Bicycle class with gear, speed\n// Create MountainBike extending Bicycle with seatHeight\npublic class Main {\n    public static void main(String[] args) {\n        // Create MountainBike and demonstrate\n    }\n}',
    solution: 'class Bicycle {\n    int gear, speed;\n    Bicycle(int g, int s) { gear = g; speed = s; }\n    void speedUp(int inc) { speed += inc; }\n}\nclass MountainBike extends Bicycle {\n    int seatHeight;\n    MountainBike(int g, int s, int h) { super(g, s); seatHeight = h; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        MountainBike mb = new MountainBike(3, 100, 25);\n        System.out.println("Gear:" + mb.gear + " Speed:" + mb.speed + " Seat:" + mb.seatHeight);\n        mb.speedUp(20);\n        System.out.println("After speedUp: " + mb.speed);\n    }\n}'
  },
  {
    id: 51, title: 'Method Overloading vs Overriding', category: 'oop', difficulty: 'medium', type: 'coding', tags: ['OOP', 'Overloading', 'Overriding'],
    description: 'Demonstrate method overloading (same name, different params) and overriding (redefine parent method in child).',
    examples: [
      { input: 'Animal a = new Pig()', output: 'Pig: wee wee' }
    ],
    starterCode: '// Demonstrate overloading and overriding\npublic class Main {\n    public static void main(String[] args) {\n        // Your code here\n    }\n}',
    solution: 'class Calculator {\n    int add(int a, int b) { return a + b; }\n    int add(int a, int b, int c) { return a + b + c; }\n}\nclass Parent { void greet() { System.out.println("Hello from Parent"); } }\nclass Child extends Parent { void greet() { System.out.println("Hi from Child"); } }\npublic class Main {\n    public static void main(String[] args) {\n        Calculator calc = new Calculator();\n        System.out.println("Overloading: add(2,3) = " + calc.add(2,3));\n        System.out.println("Overloading: add(2,3,4) = " + calc.add(2,3,4));\n        Parent p = new Parent(); p.greet();\n        Parent c = new Child(); c.greet();\n    }\n}'
  },
];