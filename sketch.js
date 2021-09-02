const w = 690;
const h = 550;
const amount_of_points = 69;
const points = [];
let start_point;
let end_point;

function draw_start_end() {
  start_point = createVector(10, 10);
  end_point = createVector(w - 10, h - 10);
  strokeWeight(12);
  stroke(69, 220, 69);
  point(start_point);
  point(end_point);
}

function draw_random_points(amount) {
  strokeWeight(5);
  stroke(220, 69, 220);
  for (let i = 0; i < amount; ++i) {
    let pos = createVector(random(22, width), random(22, height));
    points.push(pos);
    point(pos);
  }
}

function find_closest(cur_pos) {
  let dist;
  let dist_to_end;
  let dist_current_to_end;
  let closest = start_point.dist(end_point);
  let closest_point = end_point;

  for (let p of points) {
    dist = cur_pos.dist(p);
    dist_to_end = p.dist(end_point);
    dist_current_to_end = cur_pos.dist(end_point);
    if (dist < closest && dist_to_end < dist_current_to_end) {
      closest = dist;
      closest_point = p;
    }
  }
  let i = points.indexOf(closest_point);
  points.splice(i, 1);
  // draw the closest point in blue and connect the previous point with a line
  strokeWeight(1);
  stroke(255);
  line(cur_pos.x, cur_pos.y, closest_point.x, closest_point.y);
  strokeWeight(6);
  stroke(11, 88, 221);
  point(closest_point);

  return closest_point;
}

function setup() {
  createCanvas(w, h);
  background(225);

  draw_start_end();
  draw_random_points(amount_of_points);

  let cur_pos = start_point;
  for (let g = 0; g <= amount_of_points; ++g) {
    cur_pos = find_closest(cur_pos);
  }
}

function draw() {}
