# Simulation of Heat Distribution in a Rod

In this project, the goal is to simulate the heat distribution in a rod of a specified length. The simulation is performed using the heat equation.

## Simulation Method

1. **Applying Heat to the Rod**: First, heat is applied to the rod for a duration of 10 seconds. This heat is modeled using the following function:
   $$𝑓(𝑥,𝑡) = 10𝑡 \times \sin\left(\frac{𝜋𝑥}{𝐿}\right)$$

2. **Simulating Heat Distribution**: After applying heat, the distribution of temperature in the rod is simulated up to a user-specified time using the heat equation.

## Solving the Heat Equation

To solve the heat equation, the method of separation of variables is used. We assume that the solution can be expressed as the product of two independent functions of the spatial variable (𝑥) and the time variable (𝑡):
$$u(𝑥,𝑡) = X(𝑥)T(𝑡)$$

By substituting this assumption into the heat equation and separating the variables, we obtain two ordinary differential equations:
$$\frac{1}{𝑋}\frac{d^2𝑋}{d𝑥^2} = \frac{1}{𝛼^2𝑇}\frac{d𝑇}{d𝑡} = -𝜆$$

where 𝜆 is a separation constant. These equations are solved as follows:

### Solving the Spatial Equation:
$$\frac{d^2𝑋}{d𝑥^2} + 𝜆𝑋 = 0$$

With the boundary conditions 𝑋(0) = 0 and 𝑋(𝐿) = 0, the solution is:
$$𝑋(𝑥) = \sin\left(\frac{𝑛𝜋𝑥}{𝐿}\right)$$

### Solving the Temporal Equation:
$$\frac{d𝑇}{d𝑡} + 𝛼^2𝜆𝑇 = 0$$

The solution to this equation is:
$$𝑇(𝑡) = e^{-𝛼^2𝜆𝑡}$$

### Combining the Solutions:
By combining the two solutions, the general solution to the heat equation is:
$$u(𝑥,𝑡) = \sum_{𝑛=1}^{\infty} 𝐴_𝑛 \sin\left(\frac{𝑛𝜋𝑥}{𝐿}\right) e^{-𝛼^2\left(\frac{𝑛𝜋}{𝐿}\right)^2𝑡}$$

### Determining the Coefficients $𝐴_𝑛$:
Using the initial condition $𝑢(𝑥,0) = 100 \sin\left(\frac{𝜋𝑥}{𝐿}\right)$, the coefficients $𝐴_𝑛$ are determined as follows:
- $𝐴_1 = 100$
- $𝐴_𝑛 = 0$ for $𝑛 \neq 1$

Thus, the final solution to the heat equation is:
$$u(𝑥,𝑡) = 100 \sin\left(\frac{𝜋𝑥}{𝐿}\right) e^{-𝛼^2\left(\frac{𝜋}{𝐿}\right)^2𝑡}$$

## Simulation Steps

1. **Input Parameters**: The thermal diffusivity (𝛼) and the length of the rod (𝐿) are obtained from the user.
2. **Discretizing the Rod**: The rod is divided into small segments.
3. **Calculating Temperature**: The temperature at each segment and at each time step is calculated using the heat equation.
4. **Graphical Representation**: The temperature distribution in the rod is displayed graphically.

## Running the Simulation

To run the simulation, you can download the project and execute either the `index-en.html` file (for English) or the `index-fa.html` file (for Persian). Alternatively, you can use the following links to run the simulation online without downloading any files:

- [Simulation in English](#)
- [Simulation in Persian](#)

### Project Presentation

This project was presented in an Engineering Mathematics class in Persian. The presentation PowerPoint file, named `Presentation.pptx`, is also available.