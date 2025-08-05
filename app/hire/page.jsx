"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const HirePage = () => {
    const [form_data, set_form_data] = useState({
        name: "",
        email: "",
        company: "",
        projectType: "",
        budget: "",
        timeline: "",
        description: ""
    });
    const [is_submitted, set_is_submitted] = useState(false);
    const [is_submitting, set_is_submitting] = useState(false);

    const handle_input_change = (e) => {
        const { name, value } = e.target;
        set_form_data(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handle_select_change = (value, field) => {
        set_form_data(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handle_submit = async (e) => {
        e.preventDefault();
        set_is_submitting(true);

        try 
        {
            const response = await fetch("https://formspree.io/f/xeoqwpkr", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form_data),
            });

            if(response.ok) 
                {
                set_is_submitted(true);
                set_form_data({
                    name: "",
                    email: "",
                    company: "",
                    projectType: "",
                    budget: "",
                    timeline: "",
                    description: ""
                });
            } else 
            {
                throw new Error("Failed to submit form");
            }
        } catch(error) 
        {
            console.error("Error submitting form:", error);
            alert("Error submitting form. Please try again.");
        } finally 
        {
            set_is_submitting(false);
        }
    };

    if(is_submitted) 
        {
        return (
            <div className = "min-h-screen pt-36 pb-12 flex items-center justify-center">
                <div className = "container mx-auto px-4">
                    <div className = "max-w-2xl mx-auto text-center">
                        <div className = "mb-8">
                            <div className = "w-20 h-20 bg-accent-default rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className = "w-10 h-10 text-black" fill = "none" stroke = "currentColor" viewBox = "0 0 24 24">
                                    <path strokeLinecap = "round" strokeLinejoin = "round" strokeWidth = {2} d = "M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h1 className = "text-4xl font-bold mb-4">Thank You!</h1>
                            <p className = "text-xl text-white/70 mb-8">
                                Your project inquiry has been received. I'll get back to you within 24 hours to discuss your project in detail.
                            </p>
                            <Button 
                                onClick = {() => set_is_submitted(false)}
                                className = "bg-accent-default text-black hover:bg-accent-default/80"
                            >
                                Submit Another Project
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className = "min-h-screen pt-36 pb-12">
            <div className = "container mx-auto px-4">
                <div className = "max-w-4xl mx-auto">
                    {/* Header */}
                    <div className = "text-center mb-12">
                        <h1 className = "text-4xl md:text-5xl font-bold mb-6">
                            Let's Build Something <span className = "text-accent-default">Amazing</span> Together
                        </h1>
                        <p className = "text-xl text-white/70 max-w-2xl mx-auto">
                            Ready to bring your project to life? Fill out the form below and let's discuss how we can turn your ideas into reality.
                        </p>
                    </div>

                    {/* Form */}
                    <div className = "bg-[#27272c] rounded-xl p-8 md:p-12">
                        <form onSubmit={handle_submit} className = "space-y-6">
                            {/* Personal Info */}
                            <div className = "grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className = "block text-white font-medium mb-2">
                                        Full Name *
                                    </label>
                                    <Input
                                        type = "text"
                                        name = "name"
                                        value = {form_data.name}
                                        onChange = {handle_input_change}
                                        placeholder = "John Doe"
                                        required
                                        className = "bg-primary border-white/20 text-white placeholder:text-white/50"
                                    />
                                </div>
                                <div>
                                    <label className = "block text-white font-medium mb-2">
                                        Email Address *
                                    </label>
                                    <Input
                                        type = "email"
                                        name = "email"
                                        value = {form_data.email}
                                        onChange = {handle_input_change}
                                        placeholder = "john@example.com"
                                        required
                                        className = "bg-primary border-white/20 text-white placeholder:text-white/50"
                                    />
                                </div>
                            </div>

                            {/* Company */}
                            <div>
                                <label className = "block text-white font-medium mb-2">
                                    Company/Organization
                                </label>
                                <Input
                                    type = "text"
                                    name = "company"
                                    value = {form_data.company}
                                    onChange = {handle_input_change}
                                    placeholder = "Your Company"
                                    className = "bg-primary border-white/20 text-white placeholder:text-white/50"
                                />
                            </div>

                            {/* Project Details */}
                            <div className = "grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className = "block text-white font-medium mb-2">
                                        Project Type *
                                    </label>
                                    <Select onValueChange = {(value) => handle_select_change(value, "projectType")} required>
                                        <SelectTrigger className = "bg-primary border-white/20 text-white">
                                            <SelectValue placeholder = "Select project type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value = "web-development">Web Development</SelectItem>
                                            <SelectItem value = "mobile-app">Mobile App</SelectItem>
                                            <SelectItem value = "fullstack">Full-Stack Application</SelectItem>
                                            <SelectItem value = "ecommerce">E-commerce</SelectItem>
                                            <SelectItem value = "portfolio">Portfolio Website</SelectItem>
                                            <SelectItem value = "consulting">Consulting</SelectItem>
                                            <SelectItem value = "other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <label className = "block text-white font-medium mb-2">
                                        Budget Range
                                    </label>
                                    <Select onValueChange = {(value) => handle_select_change(value, "budget")}>
                                        <SelectTrigger className = "bg-primary border-white/20 text-white">
                                            <SelectValue placeholder = "Select budget range" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value = "under-5k">Under $5,000</SelectItem>
                                            <SelectItem value = "5k-10k">$5,000 - $10,000</SelectItem>
                                            <SelectItem value = "10k-25k">$10,000 - $25,000</SelectItem>
                                            <SelectItem value = "25k-50k">$25,000 - $50,000</SelectItem>
                                            <SelectItem value = "50k-plus">$50,000+</SelectItem>
                                            <SelectItem value = "discuss">Let's Discuss</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Timeline */}
                            <div>
                                <label className = "block text-white font-medium mb-2">
                                    Timeline
                                </label>
                                <Select onValueChange = {(value) => handle_select_change(value, "timeline")}>
                                    <SelectTrigger className = "bg-primary border-white/20 text-white">
                                        <SelectValue placeholder = "When do you need this completed?" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value = "asap">ASAP</SelectItem>
                                        <SelectItem value = "1-month">Within 1 month</SelectItem>
                                        <SelectItem value = "2-3-months">2-3 months</SelectItem>
                                        <SelectItem value = "3-6-months">3-6 months</SelectItem>
                                        <SelectItem value = "6-plus-months">6+ months</SelectItem>
                                        <SelectItem value = "flexible">Flexible</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Project Description */}
                            <div>
                                <label className = "block text-white font-medium mb-2">
                                    Project Description *
                                </label>
                                <Textarea
                                    name = "description"
                                    value = {form_data.description}
                                    onChange = {handle_input_change}
                                    placeholder = "Tell me about your project. What are your goals, requirements, and any specific features you need?"
                                    rows = {6}
                                    required
                                    className = "bg-primary border-white/20 text-white placeholder:text-white/50 resize-none"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className = "pt-4">
                                <Button
                                    type = "submit"
                                    disabled = {is_submitting}
                                    className = "w-full md:w-auto bg-accent-default text-black hover:bg-accent-default/80 px-8 py-3 text-lg font-semibold"
                                >
                                    {is_submitting ? "Sending..." : "Send Project Details"}
                                </Button>
                            </div>
                        </form>
                    </div>

                    {/* Additional Info */}
                    <div className = "mt-12 text-center">
                        <p className = "text-white/60 mb-4">
                            Prefer to reach out directly?
                        </p>
                        <div className = "flex flex-col sm:flex-row justify-center items-center gap-4 text-accent-default">
                            <a href = "mailto:archiedev242@gmail.com" className = "hover:text-accent-default/80 transition-colors">
                                archiedev242@gmail.com
                            </a>
                            <span className = "hidden sm:block text-white/40">•</span>
                            <a href = "tel:+380 66 970 28 17" className = "hover:text-accent-default/80 transition-colors">
                                +380 66 970 28 17
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HirePage;
