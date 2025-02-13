// influxClient.js

const { InfluxDB } = require('@influxdata/influxdb-client');

// ตั้งค่า InfluxDB Client
const token = 'lLqDhgSf0SicMo6nzSyo9YD20iPj5oN8xgYMc0RhtEstWM2KUv2NcMIQIaSsEdnHJDF0ATXhR_GiSNsu38Ym6Q==';  // ใส่ token ของคุณที่ได้จาก InfluxDB
const org = 'MyOrganization';  // ใส่ชื่อองค์กรของคุณ
const bucket = 'borrowed_items';  // ใส่ชื่อ bucket ที่จะใช้เก็บข้อมูล
const url = 'http://localhost:8086';  // URL ของ InfluxDB (ถ้าใช้ในเครื่อง local)

const client = new InfluxDB({ url, token });
const writeApi = client.getWriteApi(org, bucket, 'ns');  // ใช้หน่วยเวลาเป็น nanoseconds
const queryApi = client.getQueryApi(org);

module.exports = { writeApi, queryApi };
