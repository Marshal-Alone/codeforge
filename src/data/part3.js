// Sorting + DSA + OOP + Advanced Coding
export const part3 = [
  // ===== SORTING =====
  {
    id: 21, title: 'Bubble Sort', category: 'sorting', difficulty: 'easy', type: 'coding', tags: ['Sorting', 'O(n²)'],
    description: 'Implement bubble sort. Repeatedly swap adjacent elements if in wrong order.',
    examples: [
      { input: 'arr = {64, 34, 25, 12}', output: '[12, 25, 34, 64]' },
      { input: 'arr = {1}', output: '[1]' },
      { input: 'arr = {5, 2, 8, 1, 9}', output: '[1, 2, 5, 8, 9]' },
      { input: 'arr = {1, 2, 3, 4, 5}', output: '[1, 2, 3, 4, 5]' },
      { input: 'arr = {5, 4, 3, 2, 1}', output: '[1, 2, 3, 4, 5]' },
      { input: 'arr = {3, 3, 1, 2}', output: '[1, 2, 3, 3]' },
      { input: 'arr = {-5, 2, -1, 0}', output: '[-5, -1, 0, 2]' }
    ],
    hints: ['Use two nested loops: outer manages passes, inner compares adjacent pairs.', 'In each pass, largest element bubbles to the end.', 'Optimize: after each pass, reduce inner loop iterations by 1.'],
    starterCode: 'import java.util.Arrays;\npublic class Main {\n    public static void main(String[] args) {\n        int[] arr = {64, 34, 25, 12, 22, 11, 90};\n        // Implement bubble sort\n        System.out.println(Arrays.toString(arr));\n    }\n}',
    solution: 'import java.util.Arrays;\npublic class Main {\n    public static void main(String[] args) {\n        int[] arr = {64, 34, 25, 12, 22, 11, 90};\n        int n = arr.length;\n        for (int i = 0; i < n-1; i++)\n            for (int j = 0; j < n-i-1; j++)\n                if (arr[j] > arr[j+1]) { int t = arr[j]; arr[j] = arr[j+1]; arr[j+1] = t; }\n        System.out.println("Sorted: " + Arrays.toString(arr));\n    }\n}'
  },
  {
    id: 22, title: 'Insertion Sort', category: 'sorting', difficulty: 'easy', type: 'coding', tags: ['Sorting', 'O(n²)'],
    description: 'Implement insertion sort. Build sorted array one item at a time.',
    examples: [
      { input: 'arr = {12, 11, 13, 5}', output: '[5, 11, 12, 13]' },
      { input: 'arr = {1}', output: '[1]' },
      { input: 'arr = {2, 1}', output: '[1, 2]' },
      { input: 'arr = {1, 2, 3, 4}', output: '[1, 2, 3, 4]' },
      { input: 'arr = {4, 3, 2, 1}', output: '[1, 2, 3, 4]' },
      { input: 'arr = {5, 5, 5, 5}', output: '[5, 5, 5, 5]' },
      { input: 'arr = {-3, 1, -5, 0}', output: '[-5, -3, 0, 1]' }
    ],
    hints: ['Start from index 1 (assume first element is already sorted).', 'For each element, compare with previous sorted elements and shift right if  larger.', 'Insert current element in its correct position.'],
    starterCode: 'import java.util.Arrays;\npublic class Main {\n    public static void main(String[] args) {\n        int[] arr = {12, 11, 13, 5, 6};\n        for (int i = 1; i < arr.length; i++) {\n            int key = arr[i];\n            int j = i - 1;\n            // Your code here - shift larger elements right, then insert key\n        }\n        System.out.println(\"Sorted: \" + Arrays.toString(arr));\n    }\n}\n', solution: 'import java.util.Arrays;\npublic class Main {\n    public static void main(String[] args) {\n        int[] arr = {12, 11, 13, 5, 6};\n        for (int i = 1; i < arr.length; i++) {\n            int key = arr[i];\n            int j = i - 1;\n            while (j >= 0 && arr[j] > key) {\n                arr[j + 1] = arr[j];\n                j--;\n            }\n            arr[j + 1] = key;\n        }\n        System.out.println(\"Sorted: \" + Arrays.toString(arr));\n    }\n}'
  },
  {
    id: 23, title: 'Selection Sort', category: 'sorting', difficulty: 'easy', type: 'coding', tags: ['Sorting', 'O(n²)'],
    description: 'Implement selection sort. Find minimum and place at beginning each pass.',
    examples: [
      { input: 'arr = {64, 25, 12, 22}', output: '[12, 22, 25, 64]' },
      { input: 'arr = {1}', output: '[1]' },
      { input: 'arr = {3, 1}', output: '[1, 3]' },
      { input: 'arr = {1, 2, 3, 4, 5}', output: '[1, 2, 3, 4, 5]' },
      { input: 'arr = {5, 4, 3, 2, 1}', output: '[1, 2, 3, 4, 5]' },
      { input: 'arr = {7, 7, 7}', output: '[7, 7, 7]' },
      { input: 'arr = {-2, 5, -1, 3}', output: '[-2, -1, 3, 5]' }
    ],
    hints: ['For each position i, find the minimum element in unsorted portion (from i to end).', 'Swap minimum with element at position i.', 'Repeat until entire array is sorted.'],
    starterCode: 'import java.util.Arrays;\npublic class Main {\n    public static void main(String[] args) {\n        int[] arr = {64, 25, 12, 22, 11};\n        int n = arr.length;\n        for (int i = 0; i < n - 1; i++) {\n            int min = i;\n            // Your code here - find actual minimum and swap\n        }\n        System.out.println("Sorted: " + Arrays.toString(arr));\n    }\n}',
    solution: 'import java.util.Arrays;\npublic class Main {\n    public static void main(String[] args) {\n        int[] arr = {64, 25, 12, 22, 11};\n        int n = arr.length;\n        for (int i = 0; i < n - 1; i++) {\n            int min = i;\n            for (int j = i + 1; j < n; j++) {\n                if (arr[j] < arr[min]) {\n                    min = j;\n                }\n            }\n            int temp = arr[min];\n            arr[min] = arr[i];\n            arr[i] = temp;\n        }\n        System.out.println("Sorted: " + Arrays.toString(arr));\n    }\n}'
  },
  {
    id: 24, title: 'Quick Sort', category: 'sorting', difficulty: 'hard', type: 'coding', tags: ['Sorting', 'Divide&Conquer', 'Recursion'],
    description: 'Implement quick sort. Pick pivot, partition array around it.',
    examples: [
      { input: '{10, 7, 8, 9, 1, 5}', output: '[1, 5, 7, 8, 9, 10]' },
      { input: '{1}', output: '[1]' },
      { input: '{3, 2, 1}', output: '[1, 2, 3]' },
      { input: '{1, 2, 3, 4}', output: '[1, 2, 3, 4]' },
      { input: '{4, 3, 2, 1}', output: '[1, 2, 3, 4]' },
      { input: '{5, 5, 5}', output: '[5, 5, 5]' },
      { input: '{-3, 2, -1, 0}', output: '[-3, -1, 0, 2]' }
    ],
    hints: ['Choose last element as pivot.', 'Partition: elements less than pivot go left, greater go right.', 'Recursively sort left and right sub-arrays.'],
    starterCode: 'import java.util.Arrays;\npublic class Main {\n    static int partition(int[] arr, int low, int high) {\n       return 0;\n    }\n    static void quickSort(int[] arr, int low, int high) {\n        if (low < high) {\n            int pi = partition(arr, low, high);\n        }\n    }\n    public static void main(String[] args) {\n        int[] arr = {10, 7, 8, 9, 1, 5};\n        quickSort(arr, 0, arr.length - 1);\n        System.out.println("Sorted: " + Arrays.toString(arr));\n    }\n}',
    solution: 'import java.util.Arrays;\npublic class Main {\n    static int partition(int[] arr, int low, int high) {\n        int pivot = arr[high];\n        int i = low - 1;\n        for (int j = low; j < high; j++) {\n            if (arr[j] < pivot) {\n                i++;\n                int temp = arr[i];\n                arr[i] = arr[j];\n                arr[j] = temp;\n            }\n        }\n        int temp = arr[i + 1];\n        arr[i + 1] = arr[high];\n        arr[high] = temp;\n        return i + 1;\n    }\n    static void quickSort(int[] arr, int low, int high) {\n        if (low < high) {\n            int pi = partition(arr, low, high);\n            quickSort(arr, low, pi - 1);\n            quickSort(arr, pi + 1, high);\n        }\n    }\n    public static void main(String[] args) {\n        int[] arr = {10, 7, 8, 9, 1, 5};\n        quickSort(arr, 0, arr.length - 1);\n        System.out.println("Sorted: " + Arrays.toString(arr));\n    }\n}'
  },
  {
    id: 25, title: 'Merge Sort', category: 'sorting', difficulty: 'hard', type: 'coding', tags: ['Sorting', 'Divide&Conquer', 'Recursion'],
    description: 'Implement merge sort. Divide into halves, sort each, merge back.',
    examples: [
      { input: '{12, 11, 13, 5, 6, 7}', output: '[5, 6, 7, 11, 12, 13]' },
      { input: '{1}', output: '[1]' },
      { input: '{3, 2, 1}', output: '[1, 2, 3]' },
      { input: '{1, 2, 3, 4, 5}', output: '[1, 2, 3, 4, 5]' },
      { input: '{5, 5, 5, 5}', output: '[5, 5, 5, 5]' }
    ],
    hints: ['Divide array into two halves recursively until base case (single element).', 'Merge two sorted halves: compare first elements of each, add smaller one to result.', 'Merge operation: use two pointers and build sorted array.'],
    starterCode: 'import java.util.Arrays;\npublic class Main {\n    static void merge(int[] arr, int left, int mid, int right) {\n    }\n    static void mergeSort(int[] arr, int left, int right) {\n        if (left < right) {\n            int mid = (left + right) / 2;\n        }\n    }\n    public static void main(String[] args) {\n        int[] arr = {12, 11, 13, 5, 6, 7};\n        mergeSort(arr, 0, arr.length - 1);\n        System.out.println("Sorted: " + Arrays.toString(arr));\n    }\n}',
    solution: 'import java.util.Arrays;\npublic class Main {\n    static void merge(int[] arr, int left, int mid, int right) {\n        int[] leftArr = Arrays.copyOfRange(arr, left, mid + 1);\n        int[] rightArr = Arrays.copyOfRange(arr, mid + 1, right + 1);\n        int i = 0, j = 0, k = left;\n        while (i < leftArr.length && j < rightArr.length) {\n            arr[k++] = leftArr[i] <= rightArr[j] ? leftArr[i++] : rightArr[j++];\n        }\n        while (i < leftArr.length) arr[k++] = leftArr[i++];\n        while (j < rightArr.length) arr[k++] = rightArr[j++];\n    }\n    static void mergeSort(int[] arr, int left, int right) {\n        if (left < right) {\n            int mid = (left + right) / 2;\n            mergeSort(arr, left, mid);\n            mergeSort(arr, mid + 1, right);\n            merge(arr, left, mid, right);\n        }\n    }\n    public static void main(String[] args) {\n        int[] arr = {12, 11, 13, 5, 6, 7};\n        mergeSort(arr, 0, arr.length - 1);\n        System.out.println("Sorted: " + Arrays.toString(arr));\n    }\n}'
  },

  // ===== ADVANCED CODING =====
  {
    id: 26, title: 'Tower of Hanoi', category: 'advanced', difficulty: 'hard', type: 'coding', tags: ['Recursion', 'Classic'],
    description: 'Solve Towers of Hanoi with n disks. Move all from rod A to C using B as auxiliary.',
    examples: [
      { input: 'n = 3', output: 'Move disk 1 from A to C\\nMove disk 2 from A to B\\n...' },
      { input: 'n = 1', output: 'Move disk 1 from A to C' },
      { input: 'n = 2', output: 'Move disk 1 from A to B\\nMove disk 2 from A to C\\nMove disk 1 from B to C' },
      { input: 'n = 4', output: '15 moves total' }
    ],
    hints: ['Base case: if n == 1, print move from source to destination.', 'Move n-1 disks from source to auxiliary (using destination as support).', 'Move largest disk from source to destination, then move n-1 from auxiliary to destination.'],
    starterCode: 'public class Main {\n    static void hanoi(int n, char source, char destination, char auxiliary) {\n        // Base case: when n == 1, move disk directly\n        // Recursive case: move n-1 disks, move largest, move n-1 again\n    }\n    public static void main(String[] args) {\n        int n = 3;\n        System.out.println("Moves for " + n + " disks:");\n        hanoi(n, \'A\', \'C\', \'B\');\n    }\n}',
    solution: 'public class Main {\n    static void hanoi(int n, char source, char destination, char auxiliary) {\n        // Base case: single disk - move directly\n        if (n == 1) {\n            System.out.println("Move disk 1 from " + source + " to " + destination);\n            return;\n        }\n        // Move n-1 disks from source to auxiliary (using destination as support)\n        hanoi(n - 1, source, auxiliary, destination);\n        // Move largest disk from source to destination\n        System.out.println("Move disk " + n + " from " + source + " to " + destination);\n        // Move n-1 disks from auxiliary to destination (using source as support)\n        hanoi(n - 1, auxiliary, destination, source);\n    }\n    public static void main(String[] args) {\n        int n = 3;\n        System.out.println("Moves for " + n + " disks:");\n        hanoi(n, \'A\', \'C\', \'B\');\n    }\n}'
  },
  {
    id: 27, title: 'Longest Common Subsequence', category: 'advanced', difficulty: 'hard', type: 'coding', tags: ['DP', 'String', 'Recursion'],
    description: 'Find the length of the Longest Common Subsequence (LCS) in two strings.',
    examples: [
      { input: 's1 = "AGGTAB", s2 = "GXTXAYB"', output: '4' },
      { input: 's1 = "a", s2 = "a"', output: '1' },
      { input: 's1 = "abc", s2 = "abc"', output: '3' },
      { input: 's1 = "abc", s2 = "def"', output: '0' },
      { input: 's1 = "ab", s2 = "ba"', output: '1' },
      { input: 's1 = "", s2 = "abc"', output: '0' }
    ],
    hints: ['Create a 2D DP table where dp[i][j] = LCS length of s1[0..i-1] and s2[0..j-1].', 'If characters match: dp[i][j] = dp[i-1][j-1] + 1.', 'If not match: dp[i][j] = max(dp[i-1][j], dp[i][j-1]).'],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        String s1 = "AGGTAB", s2 = "GXTXAYB";\n        int m = s1.length(), n = s2.length();\n        int[][] dp = new int[m + 1][n + 1];\n        // Your code here - fill DP table\n        System.out.println("LCS Length: " + dp[m][n]);\n    }\n}',
    solution: 'public class Main {\n    public static void main(String[] args) {\n        String s1 = "AGGTAB", s2 = "GXTXAYB";\n        int m = s1.length(), n = s2.length();\n        // DP table: dp[i][j] = length of LCS of s1[0..i-1] and s2[0..j-1]\n        int[][] dp = new int[m + 1][n + 1];\n        // Fill DP table\n        for (int i = 1; i <= m; i++) {\n            for (int j = 1; j <= n; j++) {\n                if (s1.charAt(i - 1) == s2.charAt(j - 1)) {\n                    // Characters match: include in LCS\n                    dp[i][j] = dp[i - 1][j - 1] + 1;\n                } else {\n                    // Characters don\'t match: take max of excluding current char from either string\n                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);\n                }\n            }\n        }\n        System.out.println("LCS Length: " + dp[m][n]);\n    }\n}'
  },

  // ===== DSA =====
  {
    id: 29, title: 'Binary Tree Traversals', category: 'dsa', difficulty: 'medium', type: 'coding', tags: ['Tree', 'Recursion', 'Traversal'],
    description: 'Implement InOrder, PreOrder, and PostOrder traversal of a Binary Tree.',
    examples: [
      { input: 'Tree: 1->(2,3), 2->(4,5)', output: 'InOrder: 4 2 5 1 3\\nPreOrder: 1 2 4 5 3\\nPostOrder: 4 5 2 3 1' },
      { input: 'Single node: 1', output: 'InOrder: 1\\nPreOrder: 1\\nPostOrder: 1' },
      { input: 'Tree: 1->(2,null), 2->(null,null)', output: 'InOrder: 2 1\\nPreOrder: 1 2\\nPostOrder: 2 1' },
      { input: 'Tree: 1->(null,2), 2->(null,null)', output: 'InOrder: 1 2\\nPreOrder: 1 2\\nPostOrder: 2 1' }
    ],
    hints: ['InOrder traversal (Left-Root-Right) gives sorted order for BST.', 'PreOrder traversal (Root-Left-Right) shows tree structure for recreation.', 'PostOrder traversal (Left-Right-Root) processes children before parent.'],
    starterCode: 'public class Main {\n    static class Node {\n        int val;\n        Node left, right;\n        Node(int v) { val = v; }\n    }\n    static void inorder(Node node) {\n        // Your code here: Left, Root, Right\n    }\n    static void preorder(Node node) {\n        // Your code here: Root, Left, Right\n    }\n    static void postorder(Node node) {\n        // Your code here: Left, Right, Root\n    }\n    public static void main(String[] args) {\n        Node root = new Node(1);\n        root.left = new Node(2); root.right = new Node(3);\n        root.left.left = new Node(4); root.left.right = new Node(5);\n        System.out.print("InOrder: "); inorder(root);\n        System.out.print("\\nPreOrder: "); preorder(root);\n        System.out.print("\\nPostOrder: "); postorder(root);\n    }\n}',
    solution: 'public class Main {\n    static class Node {\n        int val;\n        Node left, right;\n        Node(int v) { val = v; }\n    }\n    // InOrder: Left - Root - Right\n    static void inorder(Node node) {\n        if (node != null) {\n            inorder(node.left);\n            System.out.print(node.val + " ");\n            inorder(node.right);\n        }\n    }\n    // PreOrder: Root - Left - Right\n    static void preorder(Node node) {\n        if (node != null) {\n            System.out.print(node.val + " ");\n            preorder(node.left);\n            preorder(node.right);\n        }\n    }\n    // PostOrder: Left - Right - Root\n    static void postorder(Node node) {\n        if (node != null) {\n            postorder(node.left);\n            postorder(node.right);\n            System.out.print(node.val + " ");\n        }\n    }\n    public static void main(String[] args) {\n        Node root = new Node(1);\n        root.left = new Node(2); root.right = new Node(3);\n        root.left.left = new Node(4); root.left.right = new Node(5);\n        System.out.print("InOrder: "); inorder(root);\n        System.out.print("\\nPreOrder: "); preorder(root);\n        System.out.print("\\nPostOrder: "); postorder(root);\n    }\n}'
  },
  {
    id: 30, title: 'Heap Sort', category: 'dsa', difficulty: 'hard', type: 'coding', tags: ['Sorting', 'Heap', 'Tree'],
    description: 'Implement heap sort using a max-heap.',
    examples: [
      { input: '{12, 11, 13, 5, 6, 7}', output: '[5, 6, 7, 11, 12, 13]' },
      { input: '{1}', output: '[1]' },
      { input: '{3, 2, 1}', output: '[1, 2, 3]' },
      { input: '{5, 5, 5}', output: '[5, 5, 5]' },
      { input: '{9, 8, 7, 6, 5}', output: '[5, 6, 7, 8, 9]' }
    ],
    hints: ['Build max-heap: heapify all non-leaf nodes from n/2-1 down to 0.', 'Swap root (max) with last element repeatedly, then heapify reduced heap.', 'Key operation: heapify(i) ensures parent >= children (max-heap property).'],
    starterCode: 'import java.util.Arrays;\npublic class Main {\n    static void heapify(int[] arr, int n, int i) {\n        // Your code here - ensure parent >= children\n    }\n    static void heapSort(int[] arr) {\n        int n = arr.length;\n        // Build max-heap\n        // Extract elements one by one from heap\n    }\n    public static void main(String[] args) {\n        int[] arr = {12, 11, 13, 5, 6, 7};\n        heapSort(arr);\n        System.out.println("Sorted: " + Arrays.toString(arr));\n    }\n}',
    solution: 'import java.util.Arrays;\npublic class Main {\n    // Heapify: ensure parent >= children (max-heap property)\n    static void heapify(int[] arr, int n, int i) {\n        int largest = i;  // Assume i is largest\n        int leftChild = 2 * i + 1;\n        int rightChild = 2 * i + 2;\n        // Compare with left child\n        if (leftChild < n && arr[leftChild] > arr[largest]) {\n            largest = leftChild;\n        }\n        // Compare with right child\n        if (rightChild < n && arr[rightChild] > arr[largest]) {\n            largest = rightChild;\n        }\n        // If largest is not root, swap and recursively heapify\n        if (largest != i) {\n            int temp = arr[i];\n            arr[i] = arr[largest];\n            arr[largest] = temp;\n            heapify(arr, n, largest);\n        }\n    }\n    static void heapSort(int[] arr) {\n        int n = arr.length;\n        // Build max-heap: heapify all non-leaf nodes\n        for (int i = n / 2 - 1; i >= 0; i--) {\n            heapify(arr, n, i);\n        }\n        // Extract elements one by one from heap\n        for (int i = n - 1; i > 0; i--) {\n            // Move current root (max) to end\n            int temp = arr[0];\n            arr[0] = arr[i];\n            arr[i] = temp;\n            // Heapify reduced heap\n            heapify(arr, i, 0);\n        }\n    }\n    public static void main(String[] args) {\n        int[] arr = {12, 11, 13, 5, 6, 7};\n        heapSort(arr);\n        System.out.println("Sorted: " + Arrays.toString(arr));\n    }\n}'
  },
  {
    id: 48, title: 'BFS (Breadth-First Search)', category: 'dsa', difficulty: 'medium', type: 'coding', tags: ['Graph', 'Queue', 'BFS'],
    description: 'Implement BFS traversal of a graph using a queue.',
    examples: [
      { input: 'Graph: 0->[1,2], 1->[2], 2->[0,3], 3->[3]', output: 'BFS from 2: 2 0 3 1' },
      { input: 'Single node: 0->[0]', output: 'BFS from 0: 0' },
      { input: 'Linear: 0->[1], 1->[2], 2->[]', output: 'BFS from 0: 0 1 2' },
      { input: 'Graph: 0->[1,2], 1->[0,2], 2->[0,1]', output: 'BFS from 0: 0 1 2' }
    ],
    hints: ['Use a Queue data structure (FIFO). Enqueue start vertex and mark as visited.', 'Dequeue front vertex, visit it, then enqueue all unvisited neighbors.', 'Continue until queue is empty. Use visited array to prevent revisiting nodes.'],
    starterCode: 'import java.util.*;\npublic class Main {\n    static void bfs(List<List<Integer>> graph, int start) {\n        boolean[] visited = new boolean[graph.size()];\n        Queue<Integer> queue = new LinkedList<>();\n        visited[start] = true;\n        queue.add(start);\n        // Your code here - dequeue, visit, enqueue unvisited neighbors\n    }\n    public static void main(String[] args) {\n        List<List<Integer>> graph = new ArrayList<>();\n        for (int i = 0; i < 4; i++) graph.add(new ArrayList<>());\n        graph.get(0).addAll(Arrays.asList(1, 2));\n        graph.get(1).add(2);\n        graph.get(2).addAll(Arrays.asList(0, 3));\n        graph.get(3).add(3);\n        System.out.print("BFS from 2: "); bfs(graph, 2);\n    }\n}',
    solution: 'import java.util.*;\npublic class Main {\n    static void bfs(List<List<Integer>> graph, int start) {\n        boolean[] visited = new boolean[graph.size()];\n        Queue<Integer> queue = new LinkedList<>();\n        visited[start] = true;  // Mark start as visited\n        queue.add(start);        // Enqueue start\n        while (!queue.isEmpty()) {\n            int node = queue.poll();  // Dequeue front node\n            System.out.print(node + " ");\n            // Enqueue all unvisited neighbors\n            for (int neighbor : graph.get(node)) {\n                if (!visited[neighbor]) {\n                    visited[neighbor] = true;\n                    queue.add(neighbor);\n                }\n            }\n        }\n    }\n    public static void main(String[] args) {\n        List<List<Integer>> graph = new ArrayList<>();\n        for (int i = 0; i < 4; i++) graph.add(new ArrayList<>());\n        graph.get(0).addAll(Arrays.asList(1, 2));\n        graph.get(1).add(2);\n        graph.get(2).addAll(Arrays.asList(0, 3));\n        graph.get(3).add(3);\n        System.out.print("BFS from 2: "); bfs(graph, 2);\n    }\n}'
  },
  {
    id: 49, title: 'DFS (Depth-First Search)', category: 'dsa', difficulty: 'medium', type: 'coding', tags: ['Graph', 'Recursion', 'DFS'],
    description: 'Implement DFS traversal of a graph using recursion.',
    examples: [
      { input: 'Graph: 0->[1,2], 1->[2], 2->[0,3], 3->[3]', output: 'DFS from 2: 2 0 1 3' },
      { input: 'Single node: 0->[0]', output: 'DFS from 0: 0' },
      { input: 'Linear: 0->[1], 1->[2], 2->[]', output: 'DFS from 0: 0 1 2' },
      { input: 'Graph: 0->[1], 1->[2], 2->[0]', output: 'DFS from 0: 0 1 2' }
    ],
    hints: ['Use recursion and a visited array to track explored nodes.', 'Visit current node (print it), mark as visited, then recursively visit unvisited neighbors.', 'Backtrack naturally as recursion unwinds.'],
    starterCode: 'import java.util.*;\npublic class Main {\n    static void dfs(List<List<Integer>> graph, int node, boolean[] visited) {\n        // Mark current as visited and print\n        // Recursively visit all unvisited neighbors\n    }\n    public static void main(String[] args) {\n        List<List<Integer>> graph = new ArrayList<>();\n        for (int i = 0; i < 4; i++) graph.add(new ArrayList<>());\n        graph.get(0).addAll(Arrays.asList(1, 2));\n        graph.get(1).add(2);\n        graph.get(2).addAll(Arrays.asList(0, 3));\n        graph.get(3).add(3);\n        System.out.print("DFS from 2: "); dfs(graph, 2, new boolean[4]);\n    }\n}',
    solution: 'import java.util.*;\npublic class Main {\n    static void dfs(List<List<Integer>> graph, int node, boolean[] visited) {\n        visited[node] = true;  // Mark current node as visited\n        System.out.print(node + " ");\n        // Recursively visit all unvisited neighbors\n        for (int neighbor : graph.get(node)) {\n            if (!visited[neighbor]) {\n                dfs(graph, neighbor, visited);  // Recursive call\n            }\n        }\n    }\n    public static void main(String[] args) {\n        List<List<Integer>> graph = new ArrayList<>();\n        for (int i = 0; i < 4; i++) graph.add(new ArrayList<>());\n        graph.get(0).addAll(Arrays.asList(1, 2));\n        graph.get(1).add(2);\n        graph.get(2).addAll(Arrays.asList(0, 3));\n        graph.get(3).add(3);\n        System.out.print("DFS from 2: "); dfs(graph, 2, new boolean[4]);\n    }\n}'
  },
  {
    id: 50, title: 'Dijkstra\'s Shortest Path', category: 'dsa', difficulty: 'hard', type: 'coding', tags: ['Graph', 'Greedy', 'Shortest Path'],
    description: 'Implement Dijkstra\'s algorithm to find shortest paths from a source vertex.',
    examples: [
      { input: 'Weighted graph, source = 0', output: 'Vertex 0 → Distance 0\\nVertex 1 → Distance 4\\n...' },
      { input: 'Single node: source = 0', output: 'Vertex 0 → Distance 0' },
      { input: 'Linear path: 0-1(5)-2(3)', output: 'Vertex 0 → Distance 0\\nVertex 1 → Distance 5\\nVertex 2 → Distance 8' },
      { input: 'Complete graph 3 nodes, source = 0', output: 'All vertices reachable' }
    ],
    hints: ['Initialize dist array with Integer.MAX_VALUE for all vertices except source (set to 0).', 'Loop V-1 times: find unvisited vertex with minimum distance, visit it, then relax all connected edges.', 'Edge relaxation: if dist[u] + weight < dist[v], update dist[v]. Use visited array to avoid reprocessing.'],
    starterCode: 'import java.util.*;\npublic class Main {\n    static void dijkstra(int[][] graph, int src) {\n        int V = graph.length;\n        int[] dist = new int[V];\n        boolean[] visited = new boolean[V];\n        Arrays.fill(dist, Integer.MAX_VALUE);\n        dist[src] = 0;\n        // Your code here - process vertices, relax edges\n    }\n    public static void main(String[] args) {\n        int[][] graph = {{0,4,0,0,0},{4,0,8,0,0},{0,8,0,7,0},{0,0,7,0,9},{0,0,0,9,0}};\n        System.out.println("Dijkstra from 0:");\n        dijkstra(graph, 0);\n    }\n}',
    solution: 'import java.util.*;\npublic class Main {\n    static void dijkstra(int[][] graph, int src) {\n        int V = graph.length;\n        int[] dist = new int[V];          // Distance from source\n        boolean[] visited = new boolean[V]; // Track visited vertices\n        // Initialize: all distances to infinity except source\n        Arrays.fill(dist, Integer.MAX_VALUE);\n        dist[src] = 0;\n        // Process all vertices\n        for (int i = 0; i < V - 1; i++) {\n            // Find unvisited vertex with minimum distance\n            int u = -1;\n            for (int v = 0; v < V; v++) {\n                if (!visited[v] && (u == -1 || dist[v] < dist[u])) {\n                    u = v;\n                }\n            }\n            visited[u] = true;\n            // Relax outgoing edges from u\n            for (int v = 0; v < V; v++) {\n                if (graph[u][v] != 0 && !visited[v] && dist[u] + graph[u][v] < dist[v]) {\n                    dist[v] = dist[u] + graph[u][v];\n                }\n            }\n        }\n        // Print shortest distances\n        for (int i = 0; i < V; i++) {\n            System.out.println("Vertex " + i + " -> Distance " + dist[i]);\n        }\n    }\n    public static void main(String[] args) {\n        int[][] graph = {{0,4,0,0,0},{4,0,8,0,0},{0,8,0,7,0},{0,0,7,0,9},{0,0,0,9,0}};\n        dijkstra(graph, 0);\n    }\n}'
  },

  // ===== OOP =====
  {
    id: 31, title: 'Encapsulation', category: 'oop', difficulty: 'easy', type: 'coding', tags: ['OOP', 'Encapsulation'],
    description: 'Demonstrate encapsulation using private variables with public getter/setter methods.',
    examples: [
      { input: 'setName("Alice")', output: 'Name: Alice' },
      { input: 'setName("Bob")', output: 'Name: Bob' }
    ],
    hints: ['Make fields private. Provide public getName()/setName() methods.'],
    starterCode: 'public class Main {\n    // Create Employee with private name field\n    // Add getter and setter\n    public static void main(String[] args) {\n        // Create employee and set name\n    }\n}',
    solution: 'public class Main {\n    private String name;\n    public String getName() { return name; }\n    public void setName(String n) { name = n; }\n    public static void main(String[] args) {\n        Main emp = new Main();\n        emp.setName("John Doe");\n        System.out.println("Name: " + emp.getName());\n    }\n}'
  },
  {
    id: 32, title: 'Polymorphism', category: 'oop', difficulty: 'medium', type: 'coding', tags: ['OOP', 'Polymorphism', 'Inheritance'],
    description: 'Implement polymorphism: parent Animal class with child classes overriding animalSound().',
    examples: [
      { input: 'Animal a = new Pig()', output: 'Pig: wee wee' },
      { input: 'Animal a = new Dog()', output: 'Dog: bow wow' }
    ],
    hints: ['Create void or dedicated print method. Use @Override annotation when overriding parent method.', 'Parent reference can hold child objects: Animal a = new Pig(); tests polymorphism.', 'Each child class overrides parent method with its own implementation using different output.'],
    starterCode: '// Create Animal class with animalSound()\n// Create Pig and Dog extending Animal\npublic class Main {\n    public static void main(String[] args) {\n        // Demonstrate polymorphism\n    }\n}',
    solution: 'class Animal { void sound() { System.out.println("Animal sound"); } }\nclass Pig extends Animal { void sound() { System.out.println("Pig: wee wee"); } }\nclass Dog extends Animal { void sound() { System.out.println("Dog: bow wow"); } }\npublic class Main {\n    public static void main(String[] args) {\n        Animal a1 = new Animal(), a2 = new Pig(), a3 = new Dog();\n        a1.sound(); a2.sound(); a3.sound();\n    }\n}'
  },
  {
    id: 33, title: 'Interface Implementation', category: 'oop', difficulty: 'medium', type: 'coding', tags: ['OOP', 'Interface', 'Abstraction'],
    description: 'Create an Animal interface with eat() and sound() methods, implement in a Cat class.',
    examples: [
      { input: 'new Cat() → cat.eat(), cat.sound()', output: 'Cat eats\nCat meows' },
      { input: 'Animal interface with eat() and sound()', output: 'Methods implemented in Cat' }
    ],
    hints: ['Use `implements` keyword. All interface methods must be implemented.'],
    starterCode: '// Create Animal interface with eat() and sound()\n// Implement in Cat class\npublic class Main {\n    public static void main(String[] args) {\n        // Create Cat and call methods\n    }\n}',
    solution: 'interface Animal { void eat(); void sound(); }\nclass Cat implements Animal {\n    public void eat() { System.out.println("Cat eats"); }\n    public void sound() { System.out.println("Cat meows"); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Cat c = new Cat(); c.eat(); c.sound();\n    }\n}'
  },
  {
    id: 34, title: 'Inheritance — Bicycle & MountainBike', category: 'oop', difficulty: 'medium', type: 'coding', tags: ['OOP', 'Inheritance'],
    description: 'Demonstrate inheritance: Bicycle class and MountainBike subclass with seat height.',
    examples: [
      { input: 'MountainBike(3, 100, 25) then speedUp(20)', output: 'Gear:3 Speed:100 Seat:25\\nAfter speedUp: 120' },
      { input: 'MountainBike(5, 150, 30)', output: 'Gear:5 Speed:150 Seat:30' }
    ],
    hints: ['Create a Bicycle parent class with gear and speed properties.', 'Create a MountainBike child class that extends Bicycle using `extends` keyword.', 'Use `super(g, s)` in MountainBike constructor to call parent constructor.'],
    starterCode: '// Create Bicycle class with gear, speed\n// Create MountainBike extending Bicycle with seatHeight\npublic class Main {\n    public static void main(String[] args) {\n        // Create MountainBike and demonstrate\n    }\n}',
    solution: 'class Bicycle {\n    int gear, speed;\n    Bicycle(int g, int s) { gear = g; speed = s; }\n    void speedUp(int inc) { speed += inc; }\n}\nclass MountainBike extends Bicycle {\n    int seatHeight;\n    MountainBike(int g, int s, int h) { super(g, s); seatHeight = h; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        MountainBike mb = new MountainBike(3, 100, 25);\n        System.out.println("Gear:" + mb.gear + " Speed:" + mb.speed + " Seat:" + mb.seatHeight);\n        mb.speedUp(20);\n        System.out.println("After speedUp: " + mb.speed);\n    }\n}'
  },
  {
    id: 51, title: 'Floyd-Warshall All-Pairs Shortest Path', category: 'dsa', difficulty: 'hard', type: 'coding', tags: ['Graph', 'DP', 'AllPairs'],
    description: 'Find shortest paths between all pairs of vertices using dynamic programming.',
    examples: [
      { input: 'Graph: 4 vertices, edges 0-1(5), 1-2(3)', output: 'Shortest distance matrix' }
    ],
    hints: ['Use 3 nested loops: k (intermediate vertex), i (source), j (destination).', 'Formula: dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]) for each k.', 'Works with negative weights but not cycles.'],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        int n = 4;\n        int[][] dist = {{0,5,999,10},{999,0,3,999},{999,999,0,1},{999,999,999,0}};\n        // Apply Floyd-Warshall\n    }\n}',
    solution: `public class Main {
    public static void main(String[] args) {
        int n = 4, INF = 999;
        int[][] dist = {{0,5,INF,10},{INF,0,3,INF},{INF,INF,0,1},{INF,INF,INF,0}};
        for (int k=0; k<n; k++) for (int i=0; i<n; i++) for (int j=0; j<n; j++) dist[i][j] = Math.min(dist[i][j], dist[i][k]+dist[k][j]);
        for (int i=0; i<n; i++) { for (int j=0; j<n; j++) System.out.print(dist[i][j]+" "); System.out.println(); }
    }
}`
  },
  {
    id: 52, title: 'Method Overloading vs Overriding', category: 'oop', difficulty: 'medium', type: 'coding', tags: ['OOP', 'Overloading', 'Overriding'],
    description: 'Demonstrate method overloading (same name, different params) and overriding (redefine parent method in child).',
    examples: [
      { input: 'calc.add(2, 3)', output: 'Overloading: 5' },
      { input: 'calc.add(2, 3, 4)', output: 'Overloading: 9' },
      { input: 'Animal a = new Pig()', output: 'Hi from Child (overriding)' }
    ],
    starterCode: '// Demonstrate overloading and overriding\npublic class Main {\n    public static void main(String[] args) {\n        // Your code here\n    }\n}',
    solution: 'class Calculator {\n    int add(int a, int b) { return a + b; }\n    int add(int a, int b, int c) { return a + b + c; }\n}\nclass Parent { void greet() { System.out.println("Hello from Parent"); } }\nclass Child extends Parent { void greet() { System.out.println("Hi from Child"); } }\npublic class Main {\n    public static void main(String[] args) {\n        Calculator calc = new Calculator();\n        System.out.println("Overloading: add(2,3) = " + calc.add(2,3));\n        System.out.println("Overloading: add(2,3,4) = " + calc.add(2,3,4));\n        Parent p = new Parent(); p.greet();\n        Parent c = new Child(); c.greet();\n    }\n}'
  },
  {
    id: 53, title: 'Abstract Class Implementation', category: 'oop', difficulty: 'medium', type: 'coding', tags: ['OOP', 'Abstract', 'Inheritance'],
    description: 'Create an abstract Shape class with abstract area() method, implement in Circle and Rectangle.',
    examples: [
      { input: 'Circle(5)', output: 'Area: 78.5' },
      { input: 'Rectangle(4, 6)', output: 'Area: 24' }
    ],
    hints: ['Abstract class cannot be instantiated. Use `abstract` keyword on class and methods.', 'Child classes must implement all abstract methods.', 'Use `super()` to call parent constructor.'],
    starterCode: 'abstract class Shape {\n    abstract void area();\n}\n// Create Circle extending Shape\n// Create Rectangle extending Shape\npublic class Main {\n    public static void main(String[] args) {\n        // Create circle and rectangle, calculate areas\n    }\n}',
    solution: 'abstract class Shape {\n    abstract void area();\n}\nclass Circle extends Shape {\n    int radius;\n    Circle(int r) { radius = r; }\n    void area() { System.out.println("Area: " + (3.14 * radius * radius)); }\n}\nclass Rectangle extends Shape {\n    int length, width;\n    Rectangle(int l, int w) { length = l; width = w; }\n    void area() { System.out.println("Area: " + (length * width)); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Circle c = new Circle(5);\n        Rectangle r = new Rectangle(4, 6);\n        c.area();\n        r.area();\n    }\n}'
  },
  {
    id: 54, title: 'Constructor Overloading', category: 'oop', difficulty: 'medium', type: 'coding', tags: ['OOP', 'Constructor', 'Overloading'],
    description: 'Demonstrate constructor overloading: multiple constructors with different parameter lists in same class.',
    examples: [
      { input: 'new Book()', output: 'Unknown by Unknown (0)' },
      { input: 'new Book("Java", "John")', output: 'Java by John (0)' },
      { input: 'new Book("Java", "John", 2023)', output: 'Java by John (2023)' }
    ],
    hints: ['Constructors have same name as class but different parameter types/count.', 'Use `this()` to call another constructor in the same class.', 'Constructors initialize object state.'],
    starterCode: 'public class Book {\n    String title;\n    String author;\n    int year;\n    // Create multiple constructors\n    public static void main(String[] args) {\n        // Create books using different constructors\n    }\n}',
    solution: 'public class Book {\n    String title, author;\n    int year;\n    Book() { this.title = "Unknown"; this.author = "Unknown"; this.year = 0; }\n    Book(String t, String a) { this.title = t; this.author = a; this.year = 0; }\n    Book(String t, String a, int y) { this.title = t; this.author = a; this.year = y; }\n    void display() { System.out.println(title + " by " + author + " (" + year + ")"); }\n    public static void main(String[] args) {\n        Book b1 = new Book();\n        Book b2 = new Book("Java Basics", "John Doe");\n        Book b3 = new Book("Advanced OOP", "Jane Smith", 2023);\n        b1.display();\n        b2.display();\n        b3.display();\n    }\n}'
  },
  {
    id: 55, title: 'Static Variables and Methods', category: 'oop', difficulty: 'medium', type: 'coding', tags: ['OOP', 'Static', 'Class Variables'],
    description: 'Demonstrate static variables (class variables) and static methods shared across all instances.',
    examples: [
      { input: 'create 3 Counter objects', output: 'count increments to 3' },
      { input: 'Counter.getCount()', output: 'returns 3 (shared across all)' }
    ],
    hints: ['Static variables are shared by all instances of a class.', 'Static methods can only access static variables/methods directly.', 'Use `ClassName.method()` to call static methods without creating object.'],
    starterCode: 'public class Counter {\n    static int count = 0;  // Shared by all instances\n    String name;\n    // Constructor increments count\n    // Static method to get count\n    public static void main(String[] args) {\n        // Create multiple Counter objects and check count\n    }\n}',
    solution: 'public class Counter {\n    static int count = 0;  // Shared across all instances\n    String name;\n    Counter(String n) { name = n; count++; }\n    static int getCount() { return count; }\n    void display() { System.out.println(name + " (Total: " + count + ")"); }\n    public static void main(String[] args) {\n        Counter c1 = new Counter("Counter1");\n        Counter c2 = new Counter("Counter2");\n        Counter c3 = new Counter("Counter3");\n        c1.display();\n        c2.display();\n        System.out.println("Total count: " + Counter.getCount());\n    }\n}'
  },
  {
    id: 56, title: 'This and Super Keywords', category: 'oop', difficulty: 'medium', type: 'coding', tags: ['OOP', 'This', 'Super', 'Inheritance'],
    description: 'Demonstrate `this` keyword (refer to current object) and `super` keyword (refer to parent class).',
    examples: [
      { input: 'Car("Red", "Tesla")', output: 'Car: Tesla, Color: Red' },
      { input: 'Car("Blue", "BMW")', output: 'Car: BMW, Color: Blue' }
    ],
    hints: ['`this` refers to current object, used for accessing instance variables or calling constructor.', '`super` refers to parent class, used for calling parent constructor or method.', 'Use `this.variable` to avoid ambiguity with parameters.'],
    starterCode: 'class Vehicle { String color; Vehicle(String c) { this.color = c; } }\nclass Car extends Vehicle {\n    String model;\n    Car(String c, String m) {\n        // Call parent constructor, set model\n    }\n    void display() {\n        // Display color and model\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Car car = new Car("Red", "Tesla");\n        car.display();\n    }\n}',
    solution: `class Vehicle {
    String color;
    Vehicle(String c) { this.color = c; }
}
class Car extends Vehicle {
    String model;
    Car(String c, String m) {
        super(c);  // Call parent constructor
        this.model = m;  // Set current object model
    }
    void display() {
        System.out.println("Car: " + this.model + ", Color: " + this.color);
    }
}
public class Main {
    public static void main(String[] args) {
        Car car = new Car("Red", "Tesla");
        car.display();
    }
}`}, {
    id: 57, title: 'Exception Handling (Try-Catch-Finally)', category: 'oop', difficulty: 'medium', type: 'coding', tags: ['OOP', 'Exception', 'Error Handling'],
    description: 'Demonstrate exception handling with try-catch-finally blocks. Handle division by zero and array out of bounds.',
    examples: [
      { input: 'num=10, den=2', output: 'Result: 5' },
      { input: 'num=10, den=0', output: 'Error: Cannot divide by zero!' }
    ],
    hints: ['Use try-catch blocks: put risky code (like division) in try, specific exceptions in catch.', 'Create catch blocks for ArithmeticException and Exception to handle different error types.', 'finally block always executes for cleanup like closing Scanner - cannot be skipped by return or exception.'],
    starterCode: 'import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        try {\n            // Get two numbers and divide\n            // Catch ArithmeticException\n        } catch (ArithmeticException e) {\n            // Handle exception\n        } finally {\n            // Cleanup code\n        }\n    }\n}',
    solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        try {
            System.out.print("Enter numerator: ");
            int num = sc.nextInt();
            System.out.print("Enter denominator: ");
            int den = sc.nextInt();
            int result = num / den;
            System.out.println("Result: " + result);
        } catch (ArithmeticException e) {
            System.out.println("Error: Cannot divide by zero!");
        } catch (Exception e) {
            System.out.println("Error: Invalid input!");
        } finally {
            System.out.println("Exception handling complete.");
            sc.close();
        }
    }
}`
  }, {
    id: 58, title: 'Wrapper Classes', category: 'oop', difficulty: 'easy', type: 'coding', tags: ['OOP', 'Wrapper', 'Boxing'],
    description: 'Demonstrate wrapper classes: converting primitive types to objects (Integer, Double, Boolean) and vice versa.',
    examples: [
      { input: 'Integer.parseInt("42")', output: 'num = 42' },
      { input: 'autobox: int x = 5; Integer y = x', output: 'y = 5 (Integer object)' }
    ],
    hints: ['Wrapper classes: new Integer(10), new Double(3.14), new Boolean(true) wrap primitives.', 'Autoboxing (automatic): Integer x = 5; converts int primitive to Integer wrapper automatically.', 'Parsing: Integer.parseInt("42"), Double.parseDouble("3.14"), Boolean.parseBoolean("true") convert String to wrapper.'],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        // Create wrapper objects\n        // Convert string to int using Integer.parseInt()\n        // Demonstrate boxing/unboxing\n    }\n}',
    solution: `public class Main {
    public static void main(String[] args) {
        // Wrapper objects
        Integer a = 10;  // Autoboxing
        Double b = 3.14;
        Boolean c = true;
        System.out.println("Integer: " + a + ", Double: " + b + ", Boolean: " + c);
        // Unboxing
        int x = a;  // Unboxing
        double y = b;
        System.out.println("Unboxed: " + x + ", " + y);
        // String to primitive
        Integer num = Integer.parseInt("42");
        Double dec = Double.parseDouble("3.14159");
        System.out.println("Parsed: " + num + ", " + dec);
        // Primitive to String
        String s1 = String.valueOf(100);
        String s2 = Integer.toString(200);
        System.out.println("String: " + s1 + ", " + s2);
    }
}`
  }, {
    id: 59, title: 'ArrayList and Collections', category: 'oop', difficulty: 'medium', type: 'coding', tags: ['OOP', 'Collections', 'ArrayList'],
    description: 'Demonstrate ArrayList: adding, removing, iterating elements and using Collections.sort().',
    examples: [
      { input: '[50, 20, 40, 10]', output: 'sorted: [10, 20, 40, 50]' },
      { input: 'remove 20', output: '[10, 40, 50]' }
    ],
    hints: ['Create ArrayList<Integer> and use add() method to insert elements; size grows automatically.', 'Use Collections.sort(list) for ascending order and Collections.reverse(list) to reverse without re-sorting.', 'Iterate with enhanced for-loop: for (int num : list). Use remove(Integer.valueOf(20)) to remove by value.'],
    starterCode: 'import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<Integer> list = new ArrayList<>();\n        // Add elements, print, sort, iterate\n    }\n}',
    solution: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<>();
        list.add(50);  list.add(20);  list.add(40);  list.add(10);
        System.out.println("Original: " + list);
        Collections.sort(list);
        System.out.println("Sorted: " + list);
        Collections.reverse(list);
        System.out.println("Reversed: " + list);
        System.out.print("Iteration: ");
        for (int num : list) { System.out.print(num + " "); }
        list.remove(Integer.valueOf(20));
        System.out.println("\\nAfter removing 20: " + list);
    }
}`
  }, {
    id: 60, title: 'HashMap and Collections', category: 'oop', difficulty: 'medium', type: 'coding', tags: ['OOP', 'HashMap', 'Key-Value'],
    description: 'Demonstrate HashMap: storing key-value pairs, iterating with entrySet(), and common operations.',
    examples: [
      { input: 'put("Alice", 85)', output: 'map.get("Alice") = 85' },
      { input: 'remove("Charlie")', output: 'Charlie removed from map' }
    ],
    hints: ['Create HashMap<String, Integer> using new HashMap<>() with generic types.', 'Use put(key,value) to insert, get(key) to retrieve, remove(key) to delete, containsKey(key) to check.', 'Iterate with entrySet(): for (Map.Entry<String,Integer> entry : map.entrySet()) { entry.getKey(); entry.getValue(); }'],
    starterCode: 'import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        HashMap<String, Integer> map = new HashMap<>();\n        // Add students and scores, retrieve, iterate\n    }\n}',
    solution: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        HashMap<String, Integer> map = new HashMap<>();
        map.put("Alice", 85);  map.put("Bob", 90);  map.put("Charlie", 78);
        System.out.println("HashMap: " + map);
        System.out.println("Alice's score: " + map.get("Alice"));
        System.out.println("Contains Bob: " + map.containsKey("Bob"));
        System.out.print("All students: ");
        for (Map.Entry<String, Integer> entry : map.entrySet()) {
            System.out.print(entry.getKey() + "=" + entry.getValue() + " ");
        }
        map.remove("Charlie");
        System.out.println("\\nAfter removing Charlie: " + map);
    }
}`
  }, {
    id: 61, title: 'String Immutability and StringBuffer', category: 'oop', difficulty: 'medium', type: 'coding', tags: ['OOP', 'String', 'StringBuffer', 'Immutability'],
    description: 'Demonstrate String immutability and use StringBuffer for mutable string operations.',
    examples: [
      { input: 's1="Hello"; s1+" World"', output: 'new String created; s1 still "Hello"' },
      { input: 'StringBuffer.append(), reverse()', output: 'StringBuffer modified in-place' }
    ],
    hints: ['Strings are immutable: operations create new String objects.', 'StringBuffer is mutable and thread-safe, better for many concatenations.', 'String + String creates new object; StringBuffer.append() modifies existing.'],
    starterCode: 'public class Main {\n    public static void main(String[] args) {\n        String s1 = "Hello";\n        String s2 = s1 + " World";  // Creates new String\n        StringBuffer sb = new StringBuffer("Hello");\n        // Append, reverse, demonstrate mutability\n    }\n}',
    solution: `public class Main {
    public static void main(String[] args) {
        // String immutability example
        String s1 = "Hello";
        String s2 = s1;  // Same reference
        String s3 = s1 + " World";  // New object created
        System.out.println("s1: " + s1);
        System.out.println("s3: " + s3);
        System.out.println("s1 == s2: " + (s1 == s2));
        System.out.println("s1 == s3: " + (s1 == s3));
        // StringBuffer for efficient concatenation
        StringBuffer sb = new StringBuffer("Hello");
        sb.append(" ");
        sb.append("World");
        System.out.println("StringBuffer: " + sb);
        sb.reverse();
        System.out.println("Reversed: " + sb);
    }
}`
  }, {
    id: 62, title: 'Regular Expressions (Regex)', category: 'oop', difficulty: 'medium', type: 'coding', tags: ['OOP', 'Regex', 'Pattern'],
    description: 'Demonstrate regular expressions: Pattern and Matcher for matching and replacing strings.',
    examples: [
      { input: 'text="My number is 12345"', output: 'pattern "\\\\d+" finds 12345' },
      { input: 'replaceAll("\\\\d", "X")', output: 'My number is XXXXX' }
    ],
    hints: ['Use Pattern.compile(regex) to create pattern, then Matcher matcher = pattern.matcher(text).', 'Methods: matcher.find() returns true if match found, matcher.group() returns matched string.', 'Common patterns in Java: \\\\d+ (digits), \\\\w+ (word chars), \\\\s (whitespace). Use replaceAll(pattern, replacement).'],
    starterCode: 'import java.util.regex.*;\npublic class Main {\n    public static void main(String[] args) {\n        String text = "Email: john@example.com";\n        // Find email pattern, replace digits\n    }\n}',
    solution: `import java.util.regex.*;
public class Main {
    public static void main(String[] args) {
        String text = "My number is 12345 and 67890.";
        // Find all digits
        Pattern p1 = Pattern.compile("\\\\d+");
        Matcher m1 = p1.matcher(text);
        System.out.print("Digits found: ");
        while (m1.find()) { System.out.print(m1.group() + " "); }
        // Replace digits with X
        String replaced = text.replaceAll("\\\\d", "X");
        System.out.println("\\nAfter replacement: " + replaced);
        // Validate email pattern
        String email = "john@example.com";
        boolean isValid = email.matches("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\\\.[a-zA-Z]{2,}$");
        System.out.println("Email valid: " + isValid);
    }
}`
  },
];