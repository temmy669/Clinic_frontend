import React, { useState, useEffect } from 'react';
import './App.css';
import {heroImage, whiteningBefore, whiteningAfter } from './assets';

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    service: '',
    message: ''
  });

  // Set minimum date to today
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('preferredDate');
    if (dateInput) {
      dateInput.setAttribute('min', today);
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const scrollToBooking = () => {
    document.getElementById('booking').scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  const updateSlider = (event, slider) => {
    const rect = slider.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    
    const afterImage = slider.querySelector('.after-image');
    const handle = slider.querySelector('.slider-handle');
    const line = slider.querySelector('.slider-line');
    
    if (afterImage && handle && line) {
      afterImage.style.clipPath = `polygon(${percentage}% 0%, 100% 0%, 100% 100%, ${percentage}% 100%)`;
      handle.style.left = `${percentage}%`;
      line.style.left = `${percentage}%`;
    }
  };

  const showLabels = (slider) => {
    const beforeLabel = slider.querySelector('.before-label');
    const afterLabel = slider.querySelector('.after-label');
    if (beforeLabel && afterLabel) {
      beforeLabel.style.opacity = '1';
      afterLabel.style.opacity = '1';
    }
  };

  const hideLabels = (slider) => {
    const beforeLabel = slider.querySelector('.before-label');
    const afterLabel = slider.querySelector('.after-label');
    if (beforeLabel && afterLabel) {
      beforeLabel.style.opacity = '0';
      afterLabel.style.opacity = '0';
    }
  };

  const submitAppointment = async (event) => {
    event.preventDefault();
    
    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = '⏳ Scheduling...';
    submitButton.disabled = true;
    
    try {
      // API call would go here
      console.log('Appointment data:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('🎉 Appointment request submitted successfully! We\'ll contact you within 24 hours.');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        preferredDate: '',
        preferredTime: '',
        service: '',
        message: ''
      });
      
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Sorry, there was an issue. Please call us at (555) 123-SMILE.');
    } finally {
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
    }
  };

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm shadow-sm fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🦷</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 heading-font">Awesome Smile</h1>
                <p className="text-xs text-blue-600 font-medium">Dental Care</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Home</a>
              <a href="#services" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Services</a>
              <a href="#gallery" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Gallery</a>
              <a href="#team" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Our Team</a>
              <a href="#testimonials" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Reviews</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Contact</a>
              <button onClick={scrollToBooking} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg">
                📅 Book Now
              </button>
            </div>
            <div className="md:hidden">
              <button onClick={scrollToBooking} className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">Book Now</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-gradient pt-24 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 heading-font leading-tight">
                Your Perfect <span className="text-blue-600">Smile</span> Starts Here
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
                Experience gentle, modern dental care in a comfortable environment. We're committed to making every visit pleasant and stress-free.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button onClick={scrollToBooking} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-xl pulse-gentle">
                  📅 Book Your Appointment
                </button>
                <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-full text-lg font-semibold transition-all">
                  📞 Call (555) 123-SMILE
                </button>
              </div>
              <div className="flex items-center justify-center lg:justify-start mt-8 space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">15+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">5,000+</div>
                  <div className="text-sm text-gray-600">Happy Patients</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">★★★★★</div>
                  <div className="text-sm text-gray-600">5-Star Reviews</div>
                </div>
              </div>
            </div>
            <div className="relative floating">
                <img src={heroImage}  alt="" className="w-full h-96 object-cover rounded-2xl" />
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl floating" style={{animationDelay: '0.5s'}}>
                🦷
              </div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-xl floating" style={{animationDelay: '1s'}}>
                ✨
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 heading-font">Complete Dental Care for Your Family</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">From routine cleanings to advanced cosmetic procedures, we provide comprehensive dental services in a comfortable, modern environment.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '👨‍👩‍👧‍👦', title: 'Family Dentistry', desc: 'Comprehensive dental care for patients of all ages, from children\'s first visits to senior dental health maintenance.', bg: 'bg-blue-100' },
              { icon: '✨', title: 'Cosmetic Dentistry', desc: 'Transform your smile with veneers, whitening, and smile makeovers using the latest cosmetic dental techniques.', bg: 'bg-blue-100' },
              { icon: '🚨', title: 'Emergency Services', desc: 'Same-day emergency appointments available for dental pain, broken teeth, and urgent dental needs.', bg: 'bg-red-100' },
              { icon: '🛡️', title: 'Preventive Care', desc: 'Regular cleanings, exams, and preventive treatments to keep your teeth and gums healthy for life.', bg: 'bg-green-100' },
              { icon: '🔧', title: 'Restorative Care', desc: 'Crowns, bridges, fillings, and implants to restore function and beauty to damaged or missing teeth.', bg: 'bg-purple-100' },
              { icon: '😴', title: 'Sedation Dentistry', desc: 'Comfortable, anxiety-free dental care with various sedation options for nervous or anxious patients.', bg: 'bg-yellow-100' }
            ].map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg card-hover border border-blue-50">
                <div className={`w-16 h-16 ${service.bg} rounded-2xl flex items-center justify-center text-3xl mb-6`}>{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 heading-font">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Gallery Section */}
      <section id="gallery" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 heading-font">Amazing Smile Transformations</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">See the incredible results our patients have achieved. These real before and after photos showcase the life-changing power of modern dentistry.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden card-hover">
            <div className="before-after-container">
              <div className="before-after-slider"
                onMouseMove={(e) => updateSlider(e, e.currentTarget)}
                onMouseEnter={(e) => showLabels(e.currentTarget)}
                onMouseLeave={(e) => hideLabels(e.currentTarget)}>
                
                <img
                  src={whiteningBefore}
                  alt="Stained Teeth"
                  className="before-image w-full h-full object-cover"
                />
                <img
                  src={whiteningAfter}
                  alt="Bright White Smile"
                  className="after-image w-full h-full object-cover"
                />

                <div className="slider-line"></div>
                <div className="slider-handle"></div>
                <div className="before-label" style={{ opacity: 0 }}>BEFORE</div>
                <div className="after-label" style={{ opacity: 0 }}>AFTER</div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2 heading-font">Professional Teeth Whitening</h3>
              <p className="text-gray-600 text-sm">
                Dramatic whitening results achieved in just one visit using our advanced whitening system.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden card-hover">
            <div className="before-after-container">
              <div className="before-after-slider"
                onMouseMove={(e) => updateSlider(e, e.currentTarget)}
                onMouseEnter={(e) => showLabels(e.currentTarget)}
                onMouseLeave={(e) => hideLabels(e.currentTarget)}>
                
                <img
                  src={whiteningBefore}
                  alt="Stained Teeth"
                  className="before-image w-full h-full object-cover"
                />
                <img
                  src={whiteningAfter}
                  alt="Bright White Smile"
                  className="after-image w-full h-full object-cover"
                />

                <div className="slider-line"></div>
                <div className="slider-handle"></div>
                <div className="before-label" style={{ opacity: 0 }}>BEFORE</div>
                <div className="after-label" style={{ opacity: 0 }}>AFTER</div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2 heading-font">Professional Teeth Whitening</h3>
              <p className="text-gray-600 text-sm">
                Dramatic whitening results achieved in just one visit using our advanced whitening system.
              </p>
            </div>
          </div>

            {/* Card 3 */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden card-hover">
            <div className="before-after-container">
              <div className="before-after-slider"
                onMouseMove={(e) => updateSlider(e, e.currentTarget)}
                onMouseEnter={(e) => showLabels(e.currentTarget)}
                onMouseLeave={(e) => hideLabels(e.currentTarget)}>
                
                <img
                  src={whiteningBefore}
                  alt="Stained Teeth"
                  className="before-image w-full h-full object-cover"
                />
                <img
                  src={whiteningAfter}
                  alt="Bright White Smile"
                  className="after-image w-full h-full object-cover"
                />

                <div className="slider-line"></div>
                <div className="slider-handle"></div>
                <div className="before-label" style={{ opacity: 0 }}>BEFORE</div>
                <div className="after-label" style={{ opacity: 0 }}>AFTER</div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2 heading-font">Professional Teeth Whitening</h3>
              <p className="text-gray-600 text-sm">
                Dramatic whitening results achieved in just one visit using our advanced whitening system.
              </p>
            </div>
          </div>

            {/* Card 4 */}
          {/* <div className="bg-white rounded-2xl shadow-xl overflow-hidden card-hover">
            <div className="before-after-container">
              <div className="before-after-slider"
                onMouseMove={(e) => updateSlider(e, e.currentTarget)}
                onMouseEnter={(e) => showLabels(e.currentTarget)}
                onMouseLeave={(e) => hideLabels(e.currentTarget)}>
                
                <img
                  src={whiteningBefore}
                  alt="Stained Teeth"
                  className="before-image w-full h-full object-cover"
                />
                <img
                  src={whiteningAfter}
                  alt="Bright White Smile"
                  className="after-image w-full h-full object-cover"
                />

                <div className="slider-line"></div>
                <div className="slider-handle"></div>
                <div className="before-label" style={{ opacity: 0 }}>BEFORE</div>
                <div className="after-label" style={{ opacity: 0 }}>AFTER</div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2 heading-font">Professional Teeth Whitening</h3>
              <p className="text-gray-600 text-sm">
                Dramatic whitening results achieved in just one visit using our advanced whitening system.
              </p>
            </div>
          </div> */}

        </div>



          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 text-center">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-gray-600 font-medium">Smile Makeovers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
                <div className="text-gray-600 font-medium">Patient Satisfaction</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
                <div className="text-gray-600 font-medium">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">★★★★★</div>
                <div className="text-gray-600 font-medium">5-Star Reviews</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Appointment Booking Form */}
      <section id="booking" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 heading-font">Book Your Appointment</h2>
            <p className="text-xl text-gray-600">Schedule your visit today and take the first step towards a healthier, brighter smile.</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl shadow-2xl p-8 lg:p-12">
            <form onSubmit={submitAppointment} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">First Name *</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    name="firstName" 
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">Last Name *</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    name="lastName" 
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    required 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="preferredDate" className="block text-sm font-semibold text-gray-700 mb-2">Preferred Date *</label>
                  <input 
                    type="date" 
                    id="preferredDate" 
                    name="preferredDate" 
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    required 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="preferredTime" className="block text-sm font-semibold text-gray-700 mb-2">Preferred Time *</label>
                  <select 
                    id="preferredTime" 
                    name="preferredTime" 
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    required 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select a time</option>
                    <option value="8:00 AM">8:00 AM</option>
                    <option value="9:00 AM">9:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="1:00 PM">1:00 PM</option>
                    <option value="2:00 PM">2:00 PM</option>
                    <option value="3:00 PM">3:00 PM</option>
                    <option value="4:00 PM">4:00 PM</option>
                    <option value="5:00 PM">5:00 PM</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-2">Type of Service *</label>
                <select 
                  id="service" 
                  name="service" 
                  value={formData.service}
                  onChange={handleInputChange}
                  required 
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select a service</option>
                  <option value="Routine Cleaning">Routine Cleaning & Exam</option>
                  <option value="Cosmetic Consultation">Cosmetic Consultation</option>
                  <option value="Emergency Visit">Emergency Visit</option>
                  <option value="Restorative Treatment">Restorative Treatment</option>
                  <option value="Pediatric Visit">Pediatric Visit</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Additional Notes</label>
                <textarea 
                  id="message" 
                  name="message" 
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4" 
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                  placeholder="Any specific concerns or questions?"
                />
              </div>
              
              <button type="submit" className="schedule-btn">
                📅 Schedule My Appointment
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 heading-font">What Our Patients Say</h2>
            <p className="text-xl text-gray-600">Real stories from real patients who love their experience at Awesome Smile Dental.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Martinez', initials: 'SM', bg: 'from-blue-400 to-blue-600', review: '"Dr. Johnson and her team made me feel so comfortable during my visit. The office is beautiful and modern, and they explained everything clearly. My teeth have never looked better!"' },
              { name: 'Mike Rodriguez', initials: 'MR', bg: 'from-green-400 to-green-600', review: '"I was terrified of dentists, but the sedation dentistry option made my procedure completely painless. The staff was incredibly patient and understanding. Highly recommend!"' },
              { name: 'Jennifer Lee', initials: 'JL', bg: 'from-purple-400 to-purple-600', review: '"The whole family loves coming here! Dr. Smith is amazing with kids, and the office has a great play area. My children actually look forward to their dental visits now."' }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg card-hover border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${testimonial.bg} rounded-full flex items-center justify-center text-white text-2xl font-bold`}>
                    {testimonial.initials}
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-yellow-400 text-lg">★★★★★</div>
                  </div>
                </div>
                <p className="text-gray-600 italic leading-relaxed">{testimonial.review}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 heading-font">Meet Our Expert Team</h2>
            <p className="text-xl text-gray-600">Experienced, caring professionals dedicated to your oral health and comfort.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Dr. Emily Johnson', role: 'Lead Dentist & Practice Owner', icon: '👩‍⚕️', badge: '🦷', bg: 'from-blue-100 to-blue-200', badgeBg: 'bg-blue-600', desc: '15+ years experience in general and cosmetic dentistry. Specializes in smile makeovers and anxiety-free dental care.' },
              { name: 'Dr. Michael Smith', role: 'Pediatric Dentist', icon: '👨‍⚕️', badge: '👶', bg: 'from-green-100 to-green-200', badgeBg: 'bg-green-600', desc: 'Board-certified pediatric dentist with a gentle approach. Makes dental visits fun and comfortable for children of all ages.' },
              { name: 'Dr. Lisa Chen', role: 'Cosmetic & Restorative Specialist', icon: '👩‍⚕️', badge: '✨', bg: 'from-purple-100 to-purple-200', badgeBg: 'bg-purple-600', desc: 'Expert in veneers, crowns, and smile transformations. Combines artistry with advanced dental techniques.' }
            ].map((doctor, index) => (
              <div key={index} className="text-center card-hover">
                <div className="relative mb-6">
                  <div className={`w-48 h-48 mx-auto bg-gradient-to-br ${doctor.bg} rounded-full flex items-center justify-center text-6xl`}>
                    {doctor.icon}
                  </div>
                  <div className={`absolute -bottom-2 -right-2 w-12 h-12 ${doctor.badgeBg} rounded-full flex items-center justify-center text-white text-xl`}>
                    {doctor.badge}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 heading-font">{doctor.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{doctor.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{doctor.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 heading-font">Visit Our Modern Clinic</h2>
            <p className="text-xl text-gray-600">Conveniently located with flexible hours to fit your schedule.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 heading-font">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-xl">📍</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Address</h4>
                    <p className="text-gray-600">123 Smile Street<br/>Dental Plaza, Suite 200<br/>Happy City, HC 12345</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-xl">📞</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Phone</h4>
                    <p className="text-gray-600">(555) 123-SMILE<br/>(555) 123-7645</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-xl">✉️</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">hello@brightsmile.com<br/>appointments@brightsmile.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 heading-font">Office Hours</h3>
              <div className="space-y-4">
                {[
                  { days: 'Monday - Tuesday', hours: '8:00 AM - 6:00 PM' },
                  { days: 'Wednesday', hours: '8:00 AM - 7:00 PM' },
                  { days: 'Thursday - Friday', hours: '8:00 AM - 5:00 PM' },
                  { days: 'Saturday', hours: '9:00 AM - 2:00 PM' },
                  { days: 'Sunday', hours: 'Emergency Only', isEmergency: true }
                ].map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="font-medium text-gray-900">{schedule.days}</span>
                    <span className={schedule.isEmergency ? "text-red-600 font-medium" : "text-gray-600"}>{schedule.hours}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-4 bg-red-50 rounded-xl border border-red-200">
                <div className="flex items-center space-x-2">
                  <span className="text-red-600 text-xl">🚨</span>
                  <span className="font-semibold text-red-800">24/7 Emergency Line</span>
                </div>
                <p className="text-red-700 text-sm mt-1">Call (555) 911-TOOTH for dental emergencies</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🦷</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold heading-font">Awesome Smile Dental Clinic</h3>
                  <p className="text-blue-400 text-sm">Modern Dental Care</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed max-w-md">Creating beautiful, healthy smiles with gentle, modern dental care. Your comfort and satisfaction are our top priorities.</p>
              <button onClick={scrollToBooking} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-all">
                📅 Book Appointment
              </button>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-gray-300">
                <a href="#services" className="block hover:text-blue-400 transition-colors">Our Services</a>
                <a href="#gallery" className="block hover:text-blue-400 transition-colors">Before & After</a>
                <a href="#team" className="block hover:text-blue-400 transition-colors">Meet the Team</a>
                <a href="#testimonials" className="block hover:text-blue-400 transition-colors">Patient Reviews</a>
                <a href="#contact" className="block hover:text-blue-400 transition-colors">Contact Us</a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <div className="space-y-2 text-gray-300">
                <div>Family Dentistry</div>
                <div>Cosmetic Dentistry</div>
                <div>Emergency Care</div>
                <div>Preventive Care</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Awesome Smile Dental. All rights reserved. | Creating beautiful smiles every day.</p>
          </div>
        </div>
      </footer>
      
    </div>
  );
}

export default App;