const observerOptions =
{
    root : null,
    rootMargin : '0px',
    threshold : 0.4
}

const onPartiallyVisible = function(entries, observer)
{
    entries.forEach(entry =>
    {
        if (entry.intersectionRatio > observerOptions.threshold)
        {
            entry.target.classList.add('reveal-container-visible');
            observer.unobserve(entry.target);
        }
    })
}

const revealContainerObserver = new IntersectionObserver(onPartiallyVisible, observerOptions)
document.querySelectorAll('.reveal-container')
        .forEach(revealContainer => revealContainerObserver.observe(revealContainer))