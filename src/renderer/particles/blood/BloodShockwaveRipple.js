/**
 * BloodShockwaveRipple.js - High-Performance GPU Particle Emitter: Blood -> ShockwaveRipple.
 */

class BloodShockwaveRipple {
  constructor(maxParticles = 1550) {
    this.element = 'Blood';
    this.emitterType = 'ShockwaveRipple';
    this.maxParticles = maxParticles;
    this.particles = new Float32Array(maxParticles * 6); // x, y, z, vx, vy, vz
    this.lifespans = new Float32Array(maxParticles);
    this.activeCount = 0;
    this.emissionRate = 50;
  }

  emit(origin, velocityVariance = 2.0) {
    if (this.activeCount >= this.maxParticles) return;
    const idx = this.activeCount * 6;
    this.particles[idx] = origin.x;
    this.particles[idx + 1] = origin.y;
    this.particles[idx + 2] = origin.z || 0;
    this.particles[idx + 3] = (Math.random() - 0.5) * velocityVariance;
    this.particles[idx + 4] = (Math.random() - 0.5) * velocityVariance;
    this.particles[idx + 5] = (Math.random() - 0.5) * velocityVariance;
    this.lifespans[this.activeCount] = 1.0;
    this.activeCount++;
  }

  update(deltaTime = 0.016) {
    let alive = 0;
    for (let i = 0; i < this.activeCount; i++) {
      this.lifespans[i] -= deltaTime * 1.2;
      if (this.lifespans[i] > 0) {
        const idx = i * 6;
        const outIdx = alive * 6;
        this.particles[outIdx] = this.particles[idx] + this.particles[idx + 3] * deltaTime;
        this.particles[outIdx + 1] = this.particles[idx + 1] + this.particles[idx + 4] * deltaTime;
        this.particles[outIdx + 2] = this.particles[idx + 2] + this.particles[idx + 5] * deltaTime;
        this.particles[outIdx + 3] = this.particles[idx + 3];
        this.particles[outIdx + 4] = this.particles[idx + 4] - 9.8 * deltaTime * 0.1; // mild gravity
        this.particles[outIdx + 5] = this.particles[idx + 5];
        this.lifespans[alive] = this.lifespans[i];
        alive++;
      }
    }
    this.activeCount = alive;
    return this.activeCount;
  }
}

module.exports = { BloodShockwaveRipple };
