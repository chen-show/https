const imageURL = './street.jpeg';

const vertexShader = `
varying vec2 v_uv;
varying vec3 v_position;

void main() {
	v_uv = uv;
	v_position = position;
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
#define PI 3.1415926

uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_time;
uniform sampler2D u_texture;

varying vec2 v_uv;
varying vec3 v_position;

vec4 Blur(sampler2D image, vec2 uv, vec2 resolution, float blur) {
	const float QUALITY = 3.0;
	const float DIRECTIONS = 16.0;
	const float SIZE = 8.0;
	vec2 r = SIZE / resolution.xy;
	vec4 color = vec4(0);
	vec4 orgColor = texture2D(image, uv);
	
	for (float d = 0.0; d < PI * 2.0; d += PI * 2.0 / DIRECTIONS) {
		for (float i = 1.0 / QUALITY; i <= 1.0; i += 1.0 / QUALITY) {
			color += texture2D(image, uv + vec2(cos(d), sin(d)) * r * i);
		}
	}
	
	color /= QUALITY * DIRECTIONS;
	color.rgb = vec3(min(0.2 + color.r, 1.0), min(0.2 + color.g, 1.0), min(0.2 + color.b, 1.0));
	return orgColor * (1.0 - blur) + color * blur;
}

float Vec2Rand(vec2 p) {
	p = fract(p * vec2(89.64, 31.321));
	p += dot(p, p + 16.313);
	return fract(p.x * p.y);
}

vec3 Drop(vec2 _uv, float t) {
	float size = 3.88;
	
	vec2 aspect = vec2(2.0, 1.0);
	vec2 uv = _uv * size * aspect;
	uv.y += t * 0.25;
	vec2 gv = fract(uv) - 0.5;
	vec2 id = floor(uv);
	
	float n = Vec2Rand(id);
	t += n * 2.0 * PI;
	float w = _uv.y * 8.0;
	float x = (n - 0.5) * 0.9;
	x += (0.45 - abs(x)) * sin(3.0 * w) * pow(sin(w), 6.0) * 0.4;
	float y = -sin(t + sin(t + sin(t) * 0.5)) * 0.4;
	y -= pow(gv.x - x, 2.0);
	
	vec2 dropPos = (gv - vec2(x, y)) / aspect;
	float drop = smoothstep(0.045, 0.03, length(dropPos));
	
	vec2 trailPos = (gv - vec2(x, t * 0.25)) / aspect;
	trailPos.y = (fract(trailPos.y * 6.0) - 0.5) / 6.0;
	
	float trail = smoothstep(0.02, 0.01, length(trailPos));
	float fog = smoothstep(-0.05, 0.05, dropPos.y);
	fog *= smoothstep(0.5, y, gv.y);
	trail *= fog;
	fog *= smoothstep(0.05, 0.04, abs(dropPos.x));
	
	vec2 offs = drop * dropPos + trail * trailPos;
	
	return vec3(offs, fog);
}

void main() {
	float dist = -5.0;
	float t = mod(u_time, 3600.0 * 2.0);
	
	vec3 col = vec3(0.0);
	vec3 drops = Drop(v_uv * 1.24, t);
	drops += Drop(v_uv * 1.54 + 0.523, t);
	drops += Drop(v_uv * 1.93 + 3.563, t * 0.9);
	drops += Drop(v_uv * 2.57 + 2.563, t * 0.8);
	
	float blur = 1.0 - pow(drops.z, 0.4);
	col = Blur(u_texture, v_uv + drops.xy * dist, vec2(max(u_resolution.x, u_resolution.y)), blur).rgb;
	gl_FragColor = vec4(col, 1.0);
}
`;