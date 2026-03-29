const payload = {
  compiler: "openjdk-jdk-22+36",
  code: "public class Main { public static void main(String[] args) { System.out.println(\"Hello from Wandbox!\"); } }",
  save: false
};

async function testWandbox() {
  try {
    const res = await fetch("https://wandbox.org/api/compile.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    console.log(res.status);
    console.log(await res.text());
  } catch(e) {
    console.log(e.message);
  }
}
testWandbox();
